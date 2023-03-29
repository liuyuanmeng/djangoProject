from .common import MaterialSerializer
from jewelleries.serializers.common import JewellerySerializer

class PopulatedMaterialSerializer(MaterialSerializer):
       jewelleries = JewellerySerializer(many=True) 