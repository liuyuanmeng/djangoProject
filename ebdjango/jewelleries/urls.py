from urllib.parse import urlparse
from django.urls import path
from .views import JewelleryListView,JewelleryDetailView

urlpatterns = [
    path('', JewelleryListView.as_view()),
    path('<int:pk>/',JewelleryDetailView.as_view())
    ]