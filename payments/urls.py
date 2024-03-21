from django.urls import path
from payments import views

urlpatterns=[
    # path("checkout/", views.MPesaCheckout.as_view(), name="checkout"),
    path('checkout/<int:id>/<str:item_type>/', views.MpesaCheckoutView.as_view(), name='mpesa_checkout'),
    path("callback/", views.MpesaCallBack.as_view(), name="callback"),
    path('check-token/', views.CheckTokenValidation.as_view()),
]