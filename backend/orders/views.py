import stripe
from django.conf import settings
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from .models import Order, OrderItem, ShippingAddress
from .serializers import (
    OrderSerializer, OrderCreateSerializer, OrderUpdateSerializer,
    ShippingAddressSerializer
)
from .permissions import IsOwnerOrAdmin
from .filters import OrderFilter

stripe.api_key = settings.STRIPE_SECRET_KEY

class ShippingAddressListCreateView(generics.ListCreateAPIView):
    serializer_class = ShippingAddressSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return ShippingAddress.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class ShippingAddressDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ShippingAddressSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwnerOrAdmin]

    def get_queryset(self):
        return ShippingAddress.objects.filter(user=self.request.user)

class OrderListCreateView(generics.ListCreateAPIView):
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [DjangoFilterBackend]
    filterset_class = OrderFilter

    def get_queryset(self):
        return Order.objects.filter(user=self.request.user)

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return OrderCreateSerializer
        return OrderSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class OrderDetailView(generics.RetrieveUpdateAPIView):
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwnerOrAdmin]

    def get_queryset(self):
        return Order.objects.filter(user=self.request.user)

    def get_serializer_class(self):
        if self.request.method in ['PUT', 'PATCH']:
            return OrderUpdateSerializer
        return OrderSerializer

class CreatePaymentIntentView(generics.GenericAPIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, *args, **kwargs):
        try:
            order_id = request.data.get('order_id')
            order = Order.objects.get(id=order_id, user=request.user)
            
            intent = stripe.PaymentIntent.create(
                amount=int(order.total_amount * 100),  # Convert to cents
                currency='usd',
                metadata={'order_id': order.id}
            )
            
            return Response({
                'clientSecret': intent['client_secret']
            })
        except Order.DoesNotExist:
            return Response(
                {'error': 'Order not found'},
                status=status.HTTP_404_NOT_FOUND
            )
        except Exception as e:
            return Response(
                {'error': str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )

class WebhookView(generics.GenericAPIView):
    permission_classes = []  # No authentication required for webhooks

    def post(self, request, *args, **kwargs):
        payload = request.body
        sig_header = request.META['HTTP_STRIPE_SIGNATURE']
        event = None

        try:
            event = stripe.Webhook.construct_event(
                payload, sig_header, settings.STRIPE_WEBHOOK_SECRET
            )
        except ValueError as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        except stripe.error.SignatureVerificationError as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        if event['type'] == 'payment_intent.succeeded':
            payment_intent = event['data']['object']
            order_id = payment_intent['metadata']['order_id']
            
            try:
                order = Order.objects.get(id=order_id)
                order.payment_status = 'paid'
                order.payment_id = payment_intent['id']
                order.save()
            except Order.DoesNotExist:
                pass

        return Response(status=status.HTTP_200_OK) 