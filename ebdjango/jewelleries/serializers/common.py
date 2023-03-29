from dataclasses import fields
from rest_framework import serializers
from ..models import Jewellery

class JewellerySerializer(serializers.ModelSerializer):
    class Meta:
        model = Jewellery
        fields = '__all__'