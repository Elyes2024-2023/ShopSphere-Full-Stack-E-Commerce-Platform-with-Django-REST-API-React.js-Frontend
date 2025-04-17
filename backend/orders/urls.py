from django.urls import path
from .views import (
    OrderListCreateView, OrderDetailView,
    ShippingAddressListCreateView, ShippingAddressDetailView,
    CreatePaymentIntentView, WebhookView
)

urlpatterns = [
    # Order URLs
    path('', OrderListCreateView.as_view(), name='order-list'),
    path('<int:pk>/', OrderDetailView.as_view(), name='order-detail'),
    
    # Shipping Address URLs
    path('shipping-addresses/', ShippingAddressListCreateView.as_view(), name='shipping-address-list'),
    path('shipping-addresses/<int:pk>/', ShippingAddressDetailView.as_view(), name='shipping-address-detail'),
    
    # Payment URLs
    path('create-payment-intent/', CreatePaymentIntentView.as_view(), name='create-payment-intent'),
    path('webhook/', WebhookView.as_view(), name='stripe-webhook'),
] 