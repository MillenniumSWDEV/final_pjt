from rest_framework.response import Response
from rest_framework.decorators import api_view
# Authentication Decorators
# from rest_framework.decorators import authentication_classes

# permission Decorators
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import status
from django.shortcuts import get_object_or_404, get_list_or_404
from .serializers import ArticleListSerializer, ArticleSerializer, CommentSerializer
from .models import Article, Comment
from rest_framework.views import APIView


class ArticleListView(APIView):
    permission_classes = [AllowAny]
 
    def get(self, request):
        articles = get_list_or_404(Article)
        serializer = ArticleListSerializer(articles, many=True)
        return Response(serializer.data)

    def post(self, request):
        self.permission_classes = [IsAuthenticated]
        self.check_permissions(request)
        serializer = ArticleSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)

class ArticleDetailView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, article_pk):
        article = get_object_or_404(Article, pk=article_pk)
        serializer = ArticleSerializer(article)
        return Response(serializer.data)
    
    def delete(self, request, article_pk):   
        self.permission_classes = [IsAuthenticated]
        self.check_permissions(request)
        article = get_object_or_404(Article, pk=article_pk)
        if article.user != request.user:
            return Response(status=status.HTTP_401_UNAUTHORIZED)
        article.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    def put(self, request, article_pk):
        self.permission_classes = [IsAuthenticated]
        self.check_permissions(request)
        article = get_object_or_404(Article, pk=article_pk)
        if article.user != request.user:
            return Response(status=status.HTTP_401_UNAUTHORIZED)
        serializer = ArticleSerializer(article, data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)

@api_view(['GET'])
def comment_list(request):
    if request.method == 'GET':
        # comments = Comment.objects.all()
        comments = get_list_or_404(Comment)
        serializer = CommentSerializer(comments, many=True)
        return Response(serializer.data)

class CommentDetailView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, comment_pk):
        comment = get_object_or_404(Comment, pk=comment_pk)
        serializer = CommentSerializer(comment)
        return Response(serializer.data)
    
    def delete(self, request, comment_pk):   
        self.permission_classes = [IsAuthenticated]
        self.check_permissions(request)
        comment = get_object_or_404(Comment, pk=comment_pk)
        if comment.user != request.user:
            return Response(status=status.HTTP_401_UNAUTHORIZED)
        comment.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    def put(self, request, comment_pk):
        self.permission_classes = [IsAuthenticated]
        self.check_permissions(request)
        comment = get_object_or_404(Comment, pk=comment_pk)
        article = get_object_or_404(Article, pk=comment.article.pk)
        if comment.user != request.user:
            return Response(status=status.HTTP_401_UNAUTHORIZED)
        serializer = CommentSerializer(comment, data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save(article=article, user=request.user)
            return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def comment_create(request, article_pk):
    # article = Article.objects.get(pk=article_pk)
    article = get_object_or_404(Article, pk=article_pk)
    serializer = CommentSerializer(data=request.data)
    if serializer.is_valid(raise_exception=True):
        serializer.save(article=article, user=request.user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
