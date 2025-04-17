from rest_framework import serializers
from .models import Product, Category, ProductImage, ProductReview

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'slug', 'description', 'parent']

class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ['id', 'image', 'is_primary']

class ProductReviewSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField()
    
    class Meta:
        model = ProductReview
        fields = ['id', 'user', 'rating', 'comment', 'created_at']
        read_only_fields = ['user', 'created_at']

class ProductSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    category_id = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.all(),
        source='category',
        write_only=True
    )
    images = ProductImageSerializer(many=True, read_only=True)
    reviews = ProductReviewSerializer(many=True, read_only=True)
    average_rating = serializers.SerializerMethodField()
    review_count = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = [
            'id', 'name', 'slug', 'description', 'price', 'stock',
            'is_available', 'category', 'category_id', 'images',
            'reviews', 'average_rating', 'review_count', 'tags',
            'metadata', 'created_at', 'updated_at'
        ]
        read_only_fields = ['slug', 'created_at', 'updated_at']

    def get_average_rating(self, obj):
        reviews = obj.reviews.all()
        if reviews:
            return sum(review.rating for review in reviews) / len(reviews)
        return 0

    def get_review_count(self, obj):
        return obj.reviews.count()

    def create(self, validated_data):
        images_data = self.context.get('view').request.FILES
        product = Product.objects.create(**validated_data)
        
        for image_data in images_data.getlist('images'):
            ProductImage.objects.create(product=product, image=image_data)
        
        return product

class ProductCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = [
            'name', 'description', 'price', 'stock',
            'category', 'tags', 'metadata'
        ]

class ProductUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = [
            'name', 'description', 'price', 'stock',
            'is_available', 'category', 'tags', 'metadata'
        ]
        read_only_fields = ['slug'] 