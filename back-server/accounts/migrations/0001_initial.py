# Generated by Django 3.2.13 on 2023-05-25 01:25

import django.contrib.auth.models
import django.contrib.auth.validators
from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('is_superuser', models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status')),
                ('username', models.CharField(error_messages={'unique': 'A user with that username already exists.'}, help_text='Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.', max_length=150, unique=True, validators=[django.contrib.auth.validators.UnicodeUsernameValidator()], verbose_name='username')),
                ('first_name', models.CharField(blank=True, max_length=150, verbose_name='first name')),
                ('last_name', models.CharField(blank=True, max_length=150, verbose_name='last name')),
                ('email', models.EmailField(blank=True, max_length=254, verbose_name='email address')),
                ('is_staff', models.BooleanField(default=False, help_text='Designates whether the user can log into this admin site.', verbose_name='staff status')),
                ('is_active', models.BooleanField(default=True, help_text='Designates whether this user should be treated as active. Unselect this instead of deleting accounts.', verbose_name='active')),
                ('date_joined', models.DateTimeField(default=django.utils.timezone.now, verbose_name='date joined')),
                ('nickname', models.CharField(max_length=50)),
                ('salary', models.CharField(blank=True, choices=[('연소득 1,000만원 미만', '연소득 1,000만원 미만'), ('연소득 1,000만원 이상 3,000만원 미만', '연소득 1,000만원 이상 3,000만원 미만'), ('연소득 3,000만원 이상 5,000만원 미만', '연소득 3,000만원 이상 5,000만원 미만'), ('연소득 5,000만원 이상', '연소득 5,000만원 이상')], max_length=50, null=True)),
                ('job', models.CharField(blank=True, choices=[('학생', '학생'), ('직장인', '직장인'), ('전업주부', '전업주부'), ('취준생', '취준생')], max_length=255, null=True)),
                ('monthly_expenses', models.CharField(blank=True, choices=[('오십만원 이하', '오십만원 이하'), ('백만원 이하', '백만원 이하'), ('삼백만원 이하', '삼백만원 이하'), ('오백만원 이하', '오백만원 이하'), ('천만원 이하', '천만원 이하')], max_length=255, null=True)),
                ('age', models.PositiveIntegerField(blank=True, null=True)),
                ('preferred_bank', models.CharField(blank=True, choices=[('국민은행', '국민은행'), ('기업은행', '기업은행'), ('신한은행', '신한은행'), ('KEB하나은행', 'KEB하나은행'), ('우리은행', '우리은행'), ('하나은행', '하나은행'), ('외환은행', '외환은행'), ('SC제일은행', 'SC제일은행')], max_length=255, null=True)),
                ('saving_preference', models.CharField(blank=True, choices=[('예금', '예금'), ('적금', '저금'), ('대출', '대출'), ('기타', '기타')], max_length=50, null=True)),
                ('financial_goal', models.CharField(blank=True, choices=[('1일1치킨', '1일1치킨'), ('파이어족;', '파이어족;'), ('건물주;;', '건물주;;'), ('재벌되기;;;', '재벌되기;;;')], max_length=50, null=True)),
                ('investment_experience', models.CharField(blank=True, choices=[('적다', '적다'), ('중간', '중간'), ('많다', '많다')], max_length=50, null=True)),
                ('asset_holdings', models.CharField(blank=True, choices=[('1천만원 이하', '1천만원 이하'), ('3천만원 이하', '3천만원 이하'), ('1억원 이하', '1억원 이하')], max_length=50, null=True)),
                ('groups', models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.Group', verbose_name='groups')),
            ],
            options={
                'verbose_name': 'user',
                'verbose_name_plural': 'users',
                'abstract': False,
            },
            managers=[
                ('objects', django.contrib.auth.models.UserManager()),
            ],
        ),
    ]
