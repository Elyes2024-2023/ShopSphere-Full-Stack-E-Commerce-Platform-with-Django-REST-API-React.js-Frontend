from rest_framework import serializers
from .models import Order, OrderItem, ShippingAddress

class OrderItemSerializer(serializers.ModelSerializer):
    product_name = serializers.CharField(source='product.name', read_only=True)
    product_slug = serializers.CharField(source='product.slug', read_only=True)
    product_image = serializers.SerializerMethodField()

    class Meta:
        model = OrderItem
        fields = ['id', 'product', 'product_name', 'product_slug', 
                 'product_image', 'quantity', 'price']
        read_only_fields = ['price']

    def get_product_image(self, obj):
        primary_image = obj.product.images.filter(is_primary=True).first()
        if primary_image:
            return self.context['request'].build_absolute_uri(primary_image.image.url)
        return None

class ShippingAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShippingAddress
        fields = ['id', 'full_name', 'phone_number', 'address_line1',
                 'address_line2', 'city', 'state', 'postal_code', 'country',
                 'is_default']
        read_only_fields = ['user']

class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)
    shipping_address = ShippingAddressSerializer(read_only=True)
    shipping_address_id = serializers.PrimaryKeyRelatedField(
        queryset=ShippingAddress.objects.all(),
        source='shipping_address',
        write_only=True
    )

    class Meta:
        model = Order
        fields = [
            'id', 'order_number', 'status', 'payment_status',
            'total_amount', 'shipping_address', 'shipping_address_id',
            'billing_address', 'payment_method', 'payment_id',
            'tracking_number', 'notes', 'items', 'created_at'
        ]
        read_only_fields = ['order_number', 'status', 'payment_status',
                           'total_amount', 'payment_id', 'tracking_number']

class OrderCreateSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True)

    class Meta:
        model = Order
        fields = ['shipping_address', 'billing_address', 'payment_method', 'items']

    def create(self, validated_data):
        items_data = validated_data.pop('items')
        order = Order.objects.create(**validated_data)
        
        total_amount = 0
        for item_data in items_data:
            product = item_data['product']
            quantity = item_data['quantity']
            price = product.price
            total_amount += price * quantity
            
            OrderItem.objects.create(
                order=order,
                product=product,
                quantity=quantity,
                price=price
            )
        
        order.total_amount = total_amount
        order.save()
        
        return order

class OrderUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ['status', 'payment_status', 'tracking_number', 'notes']
        read_only_fields = ['order_number', 'total_amount', 'payment_id'] 