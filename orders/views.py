from django.views import View
import stripe
from django.conf import settings
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import PermissionDenied, ValidationError, NotFound
from django.shortcuts import redirect
from .models import Order 
from jewelleries.models import Jewellery

stripe.api_key = settings.STRIPE_SECRET_KEY


class StripeCheackOutView(APIView):
    def get_object(self, Model, id):
        print('ID ->', Model)
        try:
            object = Model.objects.get(pk = id)
            return object
        except Model.DoesNotExist:
            raise NotFound(f'{str(Model)} with this id not found.')

    def post(self, request):
        jewelleryId = request.data.get("jewelleryId")
        jewellery = self.get_object(Jewellery, jewelleryId)

        try:
            checkout_session = stripe.checkout.Session.create(
                line_items=[
                    {
                        
                        'name': jewellery.name,
                        'image': jewellery.image,
                        'price': jewellery.price,
                        'quantity': 1,
                    },
                ],
                payment_method_types=['card',],
                mode='payment',
                success_url=settings.SITE_URL + '/?success=true&session_id={CHECKOUT_SESSION_ID}',
                cancel_url=settings.SITE_URL + '/?canceled=true',
            )

            return redirect(checkout_session.url)
        except:
            return Response(
                {'error': 'Something went wrong when creating stripe checkout session'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )