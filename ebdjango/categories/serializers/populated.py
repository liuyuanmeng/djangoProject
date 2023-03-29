from .common import CategorySerializer
from jewelleries.serializers.common import JewellerySerializer

class PopulatedCategorySerializer(CategorySerializer):
       jewelleries = JewellerySerializer(many=True)