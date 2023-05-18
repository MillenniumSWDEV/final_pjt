from django.core.exceptions import ValidationError as DjangoValidationError
from rest_framework import serializers
from allauth.utils import email_address_exists, get_username_max_length
from allauth.account import app_settings as allauth_account_settings
from allauth.account.adapter import get_adapter
from allauth.account.utils import setup_user_email
from django.utils.translation import gettext_lazy as _
from django.core.validators import MinValueValidator


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
    nickname = serializers.CharField(max_length=50)
    salary = serializers.ChoiceField(choices=SALARY_CHOICES)
    job = serializers.ChoiceField(choices=JOB_CHOICES)
    monthly_expenses = serializers.ChoiceField(choices=MONTHLY_EXPENSES_CHOICES)
    preferred_bank = serializers.ChoiceField(choices=PREFERRED_BANK_CHOICES)
    age = serializers.IntegerField(validators=[MinValueValidator(0)])
    # subscribed_products = serializers.CharField()
    saving_preference = serializers.ChoiceField(choices=SAVING_PREFERENCE_CHOICES)
    financial_goal = serializers.ChoiceField(choices=FINANCIAL_GOAL_CHOICES)
    investment_experience = serializers.ChoiceField(choices=INVESTMENT_EXPERIENCE_CHOICES)
    asset_holdings = serializers.ChoiceField(choices=ASSET_HOLDINGS_CHOICES)



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