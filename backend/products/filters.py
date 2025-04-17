import django_filters
from .models import Product

class ProductFilter(django_filters.FilterSet):
    name = django_filters.CharFilter(lookup_expr='icontains')
    category = django_filters.CharFilter(field_name='category__slug')
    min_price = django_filters.NumberFilter(field_name='price', lookup_expr='gte')
    max_price = django_filters.NumberFilter(field_name='price', lookup_expr='lte')
    in_stock = django_filters.BooleanFilter(field_name='stock', method='filter_in_stock')
    rating = django_filters.NumberFilter(method='filter_by_rating')
    tags = django_filters.CharFilter(method='filter_by_tags')

    class Meta:
        model = Product
        fields = ['name', 'category', 'is_available']

    def filter_in_stock(self, queryset, name, value):
        if value:
            return queryset.filter(stock__gt=0)
        return queryset.filter(stock=0)

    def filter_by_rating(self, queryset, name, value):
        return queryset.filter(reviews__rating__gte=value).distinct()

    def filter_by_tags(self, queryset, name, value):
        tags = value.split(',')
        return queryset.filter(tags__contains=tags) 