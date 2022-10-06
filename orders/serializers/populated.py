from .common import OrderSerializer
from jewelleries.serializers.common import JewellerySerializer
from jwt_auth.serializers.common import SimpleUserSerializer

class PopulatedOrderSerializers(OrderSerializer):
    owner = SimpleUserSerializer()
