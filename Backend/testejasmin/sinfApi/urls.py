from django.urls import path

from . import views

urlpatterns = [
    path('supplier/products/<str:id_prod>/order-request', views.Request.as_view()),
    path('login', views.Auth.as_view()),
    path('supplier/products', views.ProductList.as_view()),
    path('supplier/products/<str:id_prod>', views.ProductDetails.as_view()),
    path('client/order-requests/<str:id_req>/reject', views.RejectRequest.as_view()),
    path('client/order-requests/<str:id_req>/accept', views.AcceptRequest.as_view()),
    path('client/order-requests', views.Request.as_view()),
    path('client/<str:id_order>/order-request', views.Request.as_view()),
    path('teste/diogo', views.Teste.as_view()),
]