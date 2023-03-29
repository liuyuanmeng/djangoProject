from django.urls import path
from .views import RegisterView, LoginView,  UserDetailView,FavouriteView
urlpatterns = [
    path('register/', RegisterView.as_view()),
    path('login/', LoginView.as_view()),
  
    path('profile/<int:pk>/', UserDetailView.as_view()),
    path('profile/<int:pk>/favourite/', FavouriteView.as_view()),
    
]