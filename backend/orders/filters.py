import django_filters
from .models import Order

class OrderFilter(django_filters.FilterSet):
    status = django_filters.CharFilter(lookup_expr='iexact')
    payment_status = django_filters.CharFilter(lookup_expr='iexact')
    min_total = django_filters.NumberFilter(field_name='total_amount', lookup_expr='gte')
    max_total = django_filters.NumberFilter(field_name='total_amount', lookup_expr='lte')
    start_date = django_filters.DateFilter(field_name='created_at', lookup_expr='gte')
    end_date = django_filters.DateFilter(field_name='created_at', lookup_expr='lte')

    class Meta:
        model = Order
        fields = ['status', 'payment_status', 'payment_method'] 