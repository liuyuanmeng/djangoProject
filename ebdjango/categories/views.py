from rest_framework.views import APIView
from rest_framework.response import Response

from .serializers.populated import PopulatedCategorySerializer
from .models import Category

# Create your views here.

class CategoryListView(APIView):
    def get(self, _request):
        categories = Category.objects.all()
        serialized_categories = PopulatedCategorySerializer(categories, many=True)
        return Response(serialized_categories.data)
