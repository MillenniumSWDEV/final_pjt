from django.shortcuts import render
from django.conf import settings
from django.http.response import JsonResponse
from rest_framework.decorators import api_view
from .models import DepositProduct,DepositOptions, SavingProduct, SavingOptions
from rest_framework.response import Response
from .serializers import DepositProductSerializer, DepositOptionsSerializer, SavingProductSerializer, SavingOptionsSerializer
from rest_framework import status
from django.shortcuts import get_object_or_404
from django.conf import settings
from django.contrib.auth import get_user_model

import requests

BASE_URL = 'http://finlife.fss.or.kr/finlifeapi/'

@api_view(['GET'])
def test(req):
    json = {
        'dd':'dd'
    }
    return Response(json)

def api_test(req):
    URL = BASE_URL + 'depositProductsSearch.json'
    print('apikey', settings.API_KEY)
    params = {
        'auth': settings.API_KEY,
        # 금융회사 코드 020000(은행)
        'topFinGrpNo': '020000',
        'pageNo': 1
    }
    response= requests.get(URL, params=params)
    return response

def api_ex_rate(req):
    URL = 'https://www.koreaexim.go.kr/site/program/financial/exchangeJSON'
    params = {
        'authkey' : settings.EXRATE_API_KEY,
        'data' : "AP01",
    }
    response = requests.get(URL, params=params)
    return response


@api_view(['GET'])
def save_deposit_products(req):
    data = api_test(req).json()
    products = data['result']
    
    # return Response(products)
    for product in products['baseList']: 
        try:
            product_inDB = DepositProduct.objects.get(fin_prdt_cd= product["fin_prdt_cd"])

        except:
            serializer = DepositProductSerializer(data = product)
            if serializer.is_valid(raise_exception = True):
                serializer.save()

    for option in products['optionList']:
        if option['intr_rate'] == None:
            option['intr_rate'] = -1
        
        if option['intr_rate2'] == None:
            option['intr_rate2'] = -1
         
        # serializer = DepositOptionsSerializer(data = option)
        # if serializer.is_valid(raise_exception = True):
        #     serializer.save()

        # for key in option.keys():
        #     if option[key] == None:
        #         option[key] = -1

        product = DepositProduct.objects.get(fin_prdt_cd = option['fin_prdt_cd'])
        serializer = DepositOptionsSerializer(data = option)
        
        if serializer.is_valid(raise_exception=True): 
            serializer.save(fin_prdt_cd=product)      

    return Response(status = status.HTTP_201_CREATED)


@api_view(['GET', 'POST'])
def deposit_products(req):
    if req.method == 'GET':
        products = DepositProduct.objects.all()
        serializer = DepositProductSerializer(products, many=True)
        return Response(serializer.data)

    elif req.method == 'POST':
        serializer = DepositProductSerializer(data = req.data)
        if serializer.is_valid(raise_exception=True):
            # raise_exception = True // 유효성 검사 실패시 400상태코드 반환.
            serializer.save()
            return Response( status =status.HTTP_201_CREATED )


@api_view(['GET'])
def deposit_product_options(req,fin_prdt_cd):
    product = get_object_or_404(DepositProduct, fin_prdt_cd=fin_prdt_cd) 
    options = product.depositoptions_set.all() # 모델이름으로
    serializers = DepositOptionsSerializer(options, many = True)
    return Response(serializers.data)


@api_view(['GET'])
def top_rate(req):
    option = DepositOptions.objects.order_by('intr_rate2').first()
    print('option',option)
    prdt_id = option.fin_prdt_cd.pk
    print(f'id: {prdt_id}')
    products = DepositProduct.objects.get(pk= prdt_id)
    print('products',products)
    
    serializers = DepositProductSerializer(products)

    return Response(serializers.data)


@api_view(['GET'])
def deposit_product(req, fin_prdt_cd):
    product = get_object_or_404(DepositProduct, fin_prdt_cd=fin_prdt_cd) 
    serializers = DepositProductSerializer(product)
    return Response(serializers.data)


def api_test2(req):
    URL = BASE_URL + 'savingProductsSearch.json'
    params = {
        'auth' : settings.API_KEY,
        'topFinGrpNo': '020000',
        'pageNo': 1        
    }
    response = requests.get(URL, params=params)
    return response


@api_view(['GET'])
def save_savings_products(req):
    data = api_test2(req).json()
    products = data['result']

    for product in products['baseList']:
        try: 
            product_inDB= SavingProduct.objects.get(fin_prdt_cd=product["fin_prdt_cd"])
        except:
            serializer = SavingProductSerializer(data = product)
            if serializer.is_valid(raise_exception=True):
                serializer.save()
    
    # return Response(data)
    for option in products['optionList']:
        if option['intr_rate'] == None:
            option['intr_rate'] = -1
        
        if option['intr_rate2'] == None:
            option['intr_rate2'] = -1
         
        product = SavingProduct.objects.get(fin_prdt_cd = option['fin_prdt_cd'])
        serializer = SavingOptionsSerializer(data = option)

        if serializer.is_valid(raise_exception=True):
            serializer.save(fin_prdt_cd=product)

    return Response( status=status.HTTP_201_CREATED )

@api_view(['GET', 'POST'])
def saving_products(req):
    if req.method == 'GET':
        products = SavingProduct.objects.all()
        serializer = SavingProductSerializer(products, many=True)
        return Response(serializer.data)

    elif req.method == 'POST':
        serializer = SavingProductSerializer(data = req.data)
        if serializer.is_valid(raise_exception=True):
            # raise_exception = True // 유효성 검사 실패시 400상태코드 반환.
            serializer.save()
            return Response( status =status.HTTP_201_CREATED )


# 환율정보 받아서 응답하기
@api_view(['GET'])
def save_ex_rate(req):
    data = api_ex_rate(req).json()
    return Response(data)


# 예금상품 장바구니에 추가
@api_view(['POST'])
def deposit_product_cart(req, fin_prdt_cd):
    product = DepositProduct.objects.get(fin_prdt_cd=fin_prdt_cd)
    product.carted_user.add(req.user)
    product.save()
    serializer = DepositProductSerializer(product)

    return Response(serializer.data)


# 예금 장바구니 리스트 불러오기
@api_view(['GET'])
def deposit_cart(req):
    User = get_user_model()
    user = User.objects.get(id=req.user.pk)
    carted_products = user.cart_deposit.all()  # 해당 사용자의 장바구니에 추가된 예금 상품들을 가져옴
    print(carted_products)
    serializers = DepositProductSerializer(carted_products, many=True)

    return Response(serializers.data)

# 적금상품 장바구에 추가
@api_view(['POST'])
def saving_product_cart(req, fin_prdt_cd):
    product = SavingProduct.objects.get(fin_prdt_cd=fin_prdt_cd)
    product.carted_user.add(req.user)
    product.save()
    serializer = SavingProductSerializer(product)

    return Response(serializer.data)

# 적금 장바구니 리스트 불러오기
@api_view(['GET'])
def saving_cart(req):
    User = get_user_model()
    user = User.objects.get(id=req.user.pk)
    carted_products = user.cart_saving.all()
    serializers = SavingProductSerializer(carted_products, many=True)
    return Response(serializers.data)
