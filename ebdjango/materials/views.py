from rest_framework.views import APIView
from rest_framework.response import Response

from .serializers.populated import PopulatedMaterialSerializer
from .models import Material

class MaterialListView(APIView):
    def get(slef, _request):
        materials = Material.objects.all()
        serialized_materials = PopulatedMaterialSerializer(materials, many=True)
        return Response(serialized_materials.data)