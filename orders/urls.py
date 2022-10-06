from django.urls import path
from .views import StripeCheackOutView


urlpatterns = [
    path('create-checkout-session', StripeCheackOutView.as_view()),
]