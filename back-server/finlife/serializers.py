from rest_framework import serializers
from .models import DepositProduct, DepositOptions, SavingProduct, SavingOptions



class DepositOptionsSerializer(serializers.ModelSerializer):
    class Meta:
        model = DepositOptions
        fields = '__all__'
        read_only_fields = ('fin_prdt_cd',)


class DepositProductSerializer(serializers.ModelSerializer):
    depositoptions_set = DepositOptionsSerializer(many = True, read_only=True)
    class Meta:
        model = DepositProduct
        fields = '__all__'
        read_only_fields = ('carted_user',)


class SavingOptionsSerializer(serializers.ModelSerializer):
    class Meta:
        model = SavingOptions
        fields = '__all__'
        read_only_fields = ('fin_prdt_cd',)


class SavingProductSerializer(serializers.ModelSerializer):
    savingoptions_set = SavingOptionsSerializer(many = True, read_only=True)
    class Meta:
        model = SavingProduct
        fields = '__all__'
        read_only_fields = ('carted_user',)

