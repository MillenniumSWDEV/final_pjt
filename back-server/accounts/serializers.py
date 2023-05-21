from django.core.exceptions import ValidationError as DjangoValidationError
from rest_framework import serializers
from allauth.utils import email_address_exists, get_username_max_length
from allauth.account import app_settings as allauth_account_settings
from allauth.account.adapter import get_adapter
from allauth.account.utils import setup_user_email
from django.utils.translation import gettext_lazy as _
from django.core.validators import MinValueValidator
from django.contrib.auth import get_user_model
from django.conf import settings

class RegisterSerializer(serializers.Serializer):

    SALARY_CHOICES = (
        ('low', 'Low'),
        ('medium', 'Medium'),
        ('high', 'High'),
    )

    JOB_CHOICES = (
        ('학생', '학생'),
        ('직장인', '직장인'),
        ('전업주부', '전업주부'),
        ('취준생', '취준생')
    )

    MONTHLY_EXPENSES_CHOICES = (
        ('오십만원 이하', '오십만원 이하'),
        ('백만원 이하', '백만원 이하'),
        ('삼백만원 이하', '삼백만원 이하'),
        ('오백만원 이하', '오백만원 이하'),
        ('천만원 이하', '천만원 이하'),
    )

    PREFERRED_BANK_CHOICES = (
        ('국민은행', '국민은행'),
        ('기업은행', '기업은행'),
        ('신한은행', '신한은행'),
        ('KEB하나은행', 'KEB하나은행'),
        ('우리은행', '우리은행'),
        ('하나은행', '하나은행'),
        ('외환은행', '외환은행'),
        ('SC제일은행', 'SC제일은행'),
        # 추가 은행을 여기에 나열할 수 있습니다.
    )

    SAVING_PREFERENCE_CHOICES = (
        ('예금', '예금'),
        ('적금', '저금'),
        ('대출', '대출'),
        ('기타', '기타'),
    )

    FINANCIAL_GOAL_CHOICES = (
        ('브론즈', '브론즈'),
        ('실버', '실버'),
        ('골드', '골드'),
        ('플래', '플래'),
        ('다이아', '다이아'),
    )

    INVESTMENT_EXPERIENCE_CHOICES = (
        ('적다', '적다'),
        ('중간', '중간'),
        ('많다', '많다'),
    )

    ASSET_HOLDINGS_CHOICES = (
        ('1천만원 이하', '1천만원 이하'),
        ('3천만원 이하', '3천만원 이하'),
        ('1억원 이하', '1억원 이하'),
    )

    username = serializers.CharField(
        max_length=get_username_max_length(),
        min_length=allauth_account_settings.USERNAME_MIN_LENGTH,
        required=allauth_account_settings.USERNAME_REQUIRED,
    )
    email = serializers.EmailField(required=allauth_account_settings.EMAIL_REQUIRED)
    password1 = serializers.CharField(write_only=True)
    password2 = serializers.CharField(write_only=True)
    nickname = serializers.CharField(max_length=50, required=False)
    salary = serializers.ChoiceField(choices=SALARY_CHOICES, required=False)
    job = serializers.ChoiceField(choices=JOB_CHOICES, required=False)
    monthly_expenses = serializers.ChoiceField(choices=MONTHLY_EXPENSES_CHOICES, required=False)
    preferred_bank = serializers.ChoiceField(choices=PREFERRED_BANK_CHOICES, required=False)
    age = serializers.IntegerField(validators=[MinValueValidator(0)], required=False)
    # subscribed_products = serializers.CharField()
    saving_preference = serializers.ChoiceField(choices=SAVING_PREFERENCE_CHOICES, required=False)
    financial_goal = serializers.ChoiceField(choices=FINANCIAL_GOAL_CHOICES, required=False)
    investment_experience = serializers.ChoiceField(choices=INVESTMENT_EXPERIENCE_CHOICES, required=False)
    asset_holdings = serializers.ChoiceField(choices=ASSET_HOLDINGS_CHOICES, required=False)



    def validate_username(self, username):
        username = get_adapter().clean_username(username)
        return username

    def validate_email(self, email):
        email = get_adapter().clean_email(email)
        if allauth_account_settings.UNIQUE_EMAIL:
            if email and email_address_exists(email):
                raise serializers.ValidationError(
                    _('A user is already registered with this e-mail address.'),
                )
        return email

    def validate_password1(self, password):
        return get_adapter().clean_password(password)

    def validate_age(self, age):
        if age < 0:
            raise serializers.ValidationError("Age must be a non-negative value.")
        return str(age)
    

    def validate(self, data):
        if data['password1'] != data['password2']:
            raise serializers.ValidationError(_("The two password fields didn't match."))
        return data

    def custom_signup(self, request, user):
        pass

    def get_cleaned_data(self):
        return {
            'username': self.validated_data.get('username', ''),
            'password1': self.validated_data.get('password1', ''),
            'email': self.validated_data.get('email', ''),
            'nickname': self.validated_data.get('nickname', ''),
            'salary': self.validated_data.get('salary', ''),
            'age': self.validated_data.get('age', ''),
            'job': self.validated_data.get('job', ''),
            'monthly_expenses': self.validated_data.get('monthly_expenses', ''),
            'preferred_bank': self.validated_data.get('preferred_bank', ''),
            'saving_preference': self.validated_data.get('saving_preference', ''),
            'financial_goal': self.validated_data.get('financial_goal', ''),
            'investment_experience': self.validated_data.get('investment_experience', ''),
            'asset_holdings': self.validated_data.get('asset_holdings', ''),
            # 'subscribed_products': self.validated_data.get('subscribed_products', ''),
        }

    def save(self, request):
        # allauth 의 기본 adaper 를 가져옴
        adapter = get_adapter()
        user = adapter.new_user(request)
        self.cleaned_data = self.get_cleaned_data()
        # 기본 adaper 의 save_user 는 nickname 필드를
        # 저장하지 않는다!
        user = adapter.save_user(request, user, self, commit=False)
        if "password1" in self.cleaned_data:
            try:
                adapter.clean_password(self.cleaned_data['password1'], user=user)
            except DjangoValidationError as exc:
                raise serializers.ValidationError(
                    detail=serializers.as_serializer_error(exc)
            )
        user.save()
        self.custom_signup(request, user)
        setup_user_email(request, user, [])
        return user
    


UserModel = get_user_model()

class UserDetailsSerializer(serializers.ModelSerializer):
    """
    User model w/o password
    """

    @staticmethod
    def validate_username(username):
        if 'allauth.account' not in settings.INSTALLED_APPS:
            # We don't need to call the all-auth
            # username validator unless its installed
            return username

        from allauth.account.adapter import get_adapter
        username = get_adapter().clean_username(username)
        return username

    class Meta:
        extra_fields = []
        # see https://github.com/iMerica/dj-rest-auth/issues/181
        # UserModel.XYZ causing attribute error while importing other
        # classes from `serializers.py`. So, we need to check whether the auth model has
        # the attribute or not
        if hasattr(UserModel, 'USERNAME_FIELD'):
            extra_fields.append(UserModel.USERNAME_FIELD)
        if hasattr(UserModel, 'EMAIL_FIELD'):
            extra_fields.append(UserModel.EMAIL_FIELD)
        if hasattr(UserModel, 'first_name'):
            extra_fields.append('first_name')
        if hasattr(UserModel, 'last_name'):
            extra_fields.append('last_name')
        if hasattr(UserModel, 'nickname'):
            extra_fields.append('nickname')
        if hasattr(UserModel, 'salary'):
            extra_fields.append('salary')
        if hasattr(UserModel, 'job'):
            extra_fields.append('job')
        if hasattr(UserModel, 'monthly_expenses'):
            extra_fields.append('monthly_expenses') 
        if hasattr(UserModel, 'age'):
            extra_fields.append('age')   
        if hasattr(UserModel, 'preferred_bank'):
            extra_fields.append('preferred_bank')        
        if hasattr(UserModel, 'saving_preference'):
            extra_fields.append('saving_preference')         
        if hasattr(UserModel, 'financial_goal'):
            extra_fields.append('financial_goal')      
        if hasattr(UserModel, 'investment_experience'):
            extra_fields.append('investment_experience')    
        if hasattr(UserModel, 'asset_holdings'):
            extra_fields.append('asset_holdings') 
        if hasattr(UserModel, 'date_joined'):
            extra_fields.append('date_joined')                                          
        model = UserModel
        fields = ('pk', *extra_fields)
        read_only_fields = ('email',)
