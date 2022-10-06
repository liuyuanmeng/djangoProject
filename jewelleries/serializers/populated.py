from .common import JewellerySerializer

from categories.serializers.common import CategorySerializer
from materials.serializers.common import MaterialSerializer
# from prices.serializers.common import PriceSerialzers

from jwt_auth.serializers.common import SimpleUserSerializer


class PopulatedJewellerySerializer(JewellerySerializer):
    users = SimpleUserSerializer(many = True)
    categories = CategorySerializer(many = True)
    materials = MaterialSerializer(many = True)
    # prices = PriceSerialzers(many = True)