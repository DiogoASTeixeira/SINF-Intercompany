from django.urls import path, include

from . import views

urlpatterns = [
    path('supplier/products/<str:id_prod>/order-request', views.Request.as_view()),
    path('login', views.Auth.as_view()),
    path('supplier/products', views.ProductList.as_view()),
    path('supplier/products/<str:id_prod>', views.ProductDetails.as_view()),
    path('supplier/invoice/<str:id_req>', views.InvoiceDetails.as_view()),
    path('stats/total-income', views.TotalIncome.as_view()),
    path('stats/best-selling-product', views.BestSelling.as_view()),
    path('stats/total-income-month', views.TotalIncomeMonth.as_view()),
    path('stats/product-amount-profit', views.ProductAmountProfit.as_view()),
    path('stats/month-amount-profit', views.MonthAmountProfit.as_view()),
    path('client/order-requests/<str:id_req>/reject', views.RejectRequest.as_view()),
    path('client/order-requests/<str:id_req>/accept', views.AcceptRequest.as_view()),
    path('client/order-requests', views.Request.as_view()),
    path('client/<str:id_order>/order-request', views.Request.as_view()),
    path('rest-auth/', include('rest_auth.urls')),
    path('rest-auth/registration/', include('rest_auth.registration.urls')),
    path('rest-auth/group/', views.UserGroup.as_view())
]
