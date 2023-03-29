from rest_framework.serializers import SerializerMethodField
from .common import UserSerializer
from jewelleries.serializers.common import JewellerySerializer
from orders.serializers.common import OrderSerializer
class PopulatedUserSerializer(UserSerializer):
    favourite = JewellerySerializer(many = True)
    order = OrderSerializer(many = True)