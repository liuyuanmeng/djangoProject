# rest_framework imports
from urllib import request
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound

# custom imports
from .models import Jewellery
from .serializers.common import JewellerySerializer

 # GET - Returns all jewelleries

class JewelleryListView(APIView):

    def get(self, _request,):
        jewelleries = Jewellery.objects.all()
        serialized_jewelleries = JewellerySerializer(jewelleries, many=True)
        return Response(serialized_jewelleries.data, status=status.HTTP_200_OK)


    # ENDPOINT: /jewelleries/:pk/

    # CUSTOM FUNCTION
    # Purpose of this function is to attempt the find a specific jewellery returning that jewellery, and throwing a 404 if failed


class JewelleryDetailView(APIView):
    def get_jewellery(self, pk):
        try:
            return Jewellery.objects.get(pk=pk)
        except Jewellery.DoesNotExist as e:
            raise NotFound({'detail': str(e)})
    # GET - Return 1 item from the jewellries table
    def get(self,_request, pk):
        jewellery = self.get_jewellery(pk)
        serialized_jewellery = JewellerySerializer(jewellery)
        return Response(serialized_jewellery.data, status.HTTP_200_OK)
    
#   # DELETE - Take the pk from the data capture and fin the jewellery, deleting if we fin it.
#     def delete(self, _request, pk):
#         jewellery_to_delete = self.get_jewellery(pk)
#         jewellery_to_delete.delete()
#         return Response(status=status.HTTP_204_NO_CONTENT)

