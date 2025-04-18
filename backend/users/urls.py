from django.urls import path
from .views import (
    RegisterView, LoginView, UserProfileView,
    ChangePasswordView, UserProfileDetailView
)

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('profile/', UserProfileView.as_view(), name='user-profile'),
    path('profile/change-password/', ChangePasswordView.as_view(), name='change-password'),
    path('profile/detail/', UserProfileDetailView.as_view(), name='profile-detail'),
] 