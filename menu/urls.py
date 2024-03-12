from django.urls import path
from menu import views

urlpatterns = [
    path('breakfast/', views.BreakfastView.as_view(), name='breakfast-list'),
    path('breakfast/<str:pk>/', views.BreakfastDetailView.as_view(), name='breakfast-detail'),
    path('breakfast-create/', views.BreakfastCreateView.as_view(), name='breakfast-create'),
    path('breakfast-update/<str:pk>/', views.BreakfastEditView.as_view(), name='breakfast-update'),
    path('breakfast-delete/<str:pk>/', views.BreakfastDeleteView.as_view(), name='breakfast-delete'),

    path('lunch/', views.LunchView.as_view(), name='lunchpath-list'),
    path('lunch/<str:pk>/', views.LunchDetailView.as_view(), name='lunch-detail'),
    path('lunch-create/', views.LunchCreateView.as_view(), name='lunch-detail'),
    path('lunch/<str:pk>/', views.LunchDetailView.as_view(), name='lunch-detail'),
    path('lunch-delete/<str:pk>/', views.LunchDeleteVIew.as_view(), name='lunch-update'),

    path('dinner/', views.DinnerVIew.as_view(), name='dinner-list'),
    path('dinner-detail/<str:pk>/', views.DinnerDetailView.as_view(), name='dinner-detail'),
    path('dinner-create/', views.DinnerCreateView.as_view(), name='dinner-create'),
    path('dinner-update/<str:pk>/', views.DinnerEditView.as_view(), name='dinner-update'),
    path('dinner-delete/<str:pk>/', views.DinnerDeleteView.as_view(), name='dinner-delete'),
    
    path('cart/', views.CartAPIView.as_view(), name='cart')

]

