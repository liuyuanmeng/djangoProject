from pyexpat import model
from rest_framework.serializers import ModelSerializer
from ..models import Material

class MaterialSerializer(ModelSerializer):
    class Meta:
        model = Material
        fields = '__all__'