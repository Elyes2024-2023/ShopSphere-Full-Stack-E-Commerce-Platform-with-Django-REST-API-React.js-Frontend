from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password
from .models import UserProfile

User = get_user_model()

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ['avatar', 'bio', 'company_name', 'website', 'social_media']
        read_only_fields = ['user']

class UserSerializer(serializers.ModelSerializer):
    profile = UserProfileSerializer(required=False)
    
    class Meta:
        model = User
        fields = ['id', 'email', 'username', 'first_name', 'last_name', 
                 'phone_number', 'address', 'is_seller', 'is_admin', 'profile']
        read_only_fields = ['id', 'is_admin']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        profile_data = validated_data.pop('profile', None)
        password = validated_data.pop('password', None)
        user = User(**validated_data)
        if password:
            user.set_password(password)
        user.save()
        
        if profile_data:
            UserProfile.objects.create(user=user, **profile_data)
        
        return user

    def update(self, instance, validated_data):
        profile_data = validated_data.pop('profile', None)
        
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        
        if 'password' in validated_data:
            instance.set_password(validated_data['password'])
        
        instance.save()
        
        if profile_data:
            profile = instance.profile
            for attr, value in profile_data.items():
                setattr(profile, attr, value)
            profile.save()
        
        return instance

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ['email', 'username', 'password', 'password2', 'first_name', 'last_name']

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Password fields didn't match."})
        return attrs

    def create(self, validated_data):
        validated_data.pop('password2')
        user = User.objects.create_user(**validated_data)
        return user

class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

class ChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True, validators=[validate_password])
    new_password2 = serializers.CharField(required=True)

    def validate(self, attrs):
        if attrs['new_password'] != attrs['new_password2']:
            raise serializers.ValidationError({"new_password": "Password fields didn't match."})
        return attrs 