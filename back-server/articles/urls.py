# from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView
from django.urls import path
from . import views

urlpatterns = [
    path('articles/', views.ArticleListView.as_view()),
    # path('articles/', views.article_list),
    path('articles/<int:article_pk>/', views.ArticleDetailView.as_view()),
    path('comments/', views.comment_list),
    # path('comments/<int:comment_pk>/', views.comment_detail),
    path('comments/<int:comment_pk>/', views.CommentDetailView.as_view()),
    path('articles/<int:article_pk>/comments/', views.comment_create),
    # # 필수 작성
    # path('schema/', SpectacularAPIView.as_view(), name='schema'),
    # # optional UI
    # path('swagger/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
]
