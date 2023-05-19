from django.db import models
from django.contrib.auth.models import AbstractUser
from finlife.models import DepositProduct

class User(AbstractUser):

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
    # 여기다가 닉네임필드 만들구



    nickname = models.CharField(max_length=50)
    salary = models.CharField(max_length=20, choices=SALARY_CHOICES, null=True, blank=True)
    job = models.CharField(max_length=255, choices=JOB_CHOICES, null=True, blank=True)  # 직업
    monthly_expenses = models.CharField(max_length=255, choices=MONTHLY_EXPENSES_CHOICES, null=True, blank=True)  # 월 지출
    age = models.PositiveIntegerField(null=True, blank=True)  # 나이
    preferred_bank = models.CharField(max_length=255, choices=PREFERRED_BANK_CHOICES, null=True, blank=True)  # 선호하는 은행
    subscribed_products = models.ManyToManyField(DepositProduct, null=True, blank=True)  # 이미 가입된 상품
    saving_preference = models.CharField(max_length=20, choices=SAVING_PREFERENCE_CHOICES, null=True, blank=True)  # 저축 성향
    financial_goal = models.CharField(max_length=20, choices=FINANCIAL_GOAL_CHOICES, null=True, blank=True)  # 재무목표
    investment_experience = models.CharField(max_length=20, choices=INVESTMENT_EXPERIENCE_CHOICES, null=True, blank=True)  # 투자경험
    asset_holdings = models.CharField(max_length=20, choices=ASSET_HOLDINGS_CHOICES, null=True, blank=True)  # 보유자산


    def __str__(self):
        return f'이름이 {self.username}인 유저'



# 상속 받아서 구현해보기
from allauth.account.adapter import DefaultAccountAdapter

class CustomAccountAdapter(DefaultAccountAdapter):
    # 기본 코드는 다 그대로 쓰고, save_user 만 오버라이딩 하겠다!
    def save_user(self, request, user, form, commit=True):
        """
        Saves a new `User` instance using information provided in the
        signup form.
        """
        from allauth.account.utils import user_email, user_field, user_username

        data = form.cleaned_data
        first_name = data.get("first_name")
        last_name = data.get("last_name")
        email = data.get("email")
        username = data.get("username")
        # nickname 필드
        nickname = data.get("nickname")
        salary = data.get("salary")
        job = data.get("job")
        monthly_expenses = data.get("monthly_expenses")
        age = data.get("age")
        preferred_bank = data.get("preferred_bank")
        subscribed_products = data.get("subscribed_products")
        saving_preference = data.get("saving_preference")
        financial_goal = data.get("financial_goal")
        investment_experience = data.get("investment_experience")
        asset_holdings = data.get("asset_holdings")

        user_email(user, email)
        user_username(user, username)
        if first_name:
            user_field(user, "first_name", first_name)
        if last_name:
            user_field(user, "last_name", last_name)
        # 닉네임 필드 추가
        if nickname:
            user_field(user, "nickname", nickname)
        if salary:
            user_field(user, "salary", salary)            
        if age:
            user_field(user, "age", age)
        if monthly_expenses:
            user_field(user, "monthly_expenses", monthly_expenses)
        if job:
            user_field(user, "job", job)
        if preferred_bank:
            user_field(user, "preferred_bank", preferred_bank)
        if subscribed_products:
            user_field(user, "subscribed_products", subscribed_products)
        if saving_preference:
            user_field(user, "saving_preference", saving_preference)
        if financial_goal:
            user_field(user, "financial_goal", financial_goal)
        if investment_experience:
            user_field(user, "investment_experience", investment_experience)
        if asset_holdings:
            user_field(user, "asset_holdings", asset_holdings)


        if "password1" in data:
            user.set_password(data["password1"])
        else:
            user.set_unusable_password()
        self.populate_username(request, user)
        if commit:
            # Ability not to commit makes it easier to derive from
            # this adapter by adding
            user.save()
        return user