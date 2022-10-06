from xml.etree.ElementTree import PI
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from rest_framework.exceptions import PermissionDenied, ValidationError, NotFound
from rest_framework.permissions import IsAuthenticated

# For tokenization
import jwt
from django.conf import settings


# DateTime for Token
from datetime import datetime, timedelta

# Serializers
from .serializers.common import UserSerializer
from jwt_auth.serializers.populated import PopulatedUserSerializer
from jewelleries.serializers.common import JewellerySerializer

# Models
from jewelleries.models import Jewellery
from django.contrib.auth import get_user_model
User = get_user_model()

# Create your views here.

# Endpoint: /register/
# Methods: POST


class RegisterView(APIView):

    # POST - register a user
    def post(self, request):
        user_to_add = UserSerializer(data=request.data)
        try:
            user_to_add.is_valid(True)
            print(user_to_add.errors)
            user_to_add.save()
            return Response({'message': 'Registration Successful'}, status.HTTP_202_ACCEPTED)
        except ValidationError:
            return Response(user_to_add.errors, status.HTTP_422_UNPROCESSABLE_ENTITY)
        except Exception as e:
            print(e)
            return Response({'detail': str(e)}, status.HTTP_422_UNPROCESSABLE_ENTITY)

# Endpoint: /login/
# Methods: POST


class LoginView(APIView):

    # POST - Login a user and return a token
    def post(self, request):

        # Save username and password from request to variables
        email = request.data.get('email')
        password = request.data.get('password')

        # Try to find user, if not found, return an ambiguous error
        try:
            user_to_login = User.objects.get(email=email)
        except User.DoesNotExist:
            raise PermissionDenied('Invalid credentials.')

        # If user is found but password does not match, return error
        if not User.check_password(user_to_login, password):
            raise PermissionDenied('Invalid credentials.')

        # ? Now that the username/password checks out, we can create and return a token
        # Get time one week for now for use in token exp
        exp_time = datetime.now() + timedelta(weeks=1)

        # Encode token using jwt
        token = jwt.encode(
            {
                'sub': user_to_login.id,
                'exp': int(exp_time.strftime('%s')),
            },
            settings.SECRET_KEY,
            'HS256'
        )

        # Return response with token
        return Response(
            {
                'message': f'Welcome back {user_to_login.first_name}!',
                'token': token,
            },
            status.HTTP_202_ACCEPTED
        )


# # GET : /users/
# class UserListView(APIView):
#   # Must be authenticated to all users
#   permission_classes = (IsAuthenticated, )

#   def get(self, _request):
#     users = User.objects.all()
#     serialized_users = PopulatedUserSerializer(users, many=True)
#     return Response(serialized_users.data)


# Endpoint: /profile/:id
# Methods: GET, PUT, DELETE
class UserDetailView(APIView):
  # Must be authenticated to retrieve, modify, or delete a user
  permission_classes = (IsAuthenticated, )

  # Method - Find and returns a user or raises a DoesNotExist error
  def get_user(self, pk, request_user_id):

        # Attempt to get User, returning only if requesting user is that user
        try:
            user = User.objects.get(pk=pk)
            if user.id != request_user_id:
                raise PermissionDenied(
                    'You do not have permission to make requests on other profiles.')
            return user

        # If User ID is not found, raise an error
        except User.DoesNotExist:
            raise NotFound('User with this id not found.')

    # GET - gets user profile details
  def get(self, request, pk):
        # Get User
        user_to_get = self.get_user(pk, request.user.id)

        # Serialize User if returned
        serialized_user = PopulatedUserSerializer(user_to_get)

        # Return User
        return Response(serialized_user.data)


    # PUT - Update user profile
  def put(self, request, pk):
        
        # Get User
        user_to_edit = self.get_user(pk, request.user.id)

        # Deserialize User if returned
        deserialized_user = UserSerializer(user_to_edit, data=request.data)

        # Check if deserialized User data is valid, saving if yes or returning an error if no
        try:
            deserialized_user.is_valid(True)
            deserialized_user.save()
            return Response(deserialized_user.data, status.HTTP_202_ACCEPTED)
        except Exception as e:
            return Response(e.args[0], status.HTTP_422_UNPROCESSABLE_ENTITY)

    # DELETE - Delete user profile
  def delete(self, request, pk):

        # Get User
        user_to_delete = self.get_user(pk, request.user.id)

        # Delete User if found
        user_to_delete.delete()

        # Return empty response
        return Response(status = status.HTTP_204_NO_CONTENT)


        
    
# Endpoint: /profile/<int:pk>/favourite
# Methods: GET, POST, DELETE

class FavouriteView(APIView):
    permission_classes = (IsAuthenticated, )
    def get_object(self, Model, id):
        print('ID ->', Model)
        try:
            object = Model.objects.get(pk = id)
            return object
        except Model.DoesNotExist:
            raise NotFound(f'{str(Model)} with this id not found.')
   

    def check_user(self, requestId, userId):
        if requestId != userId:
            raise PermissionDenied()

# Post - add jewellery to user favourite
    def post(self, request, pk):
        jewelleryId = request.data.get("jewelleryId")
   
         # Get User and Jewellery  objects
        user = self.get_object(User, pk)
        jewellery = self.get_object(Jewellery, jewelleryId)

        #Add Jewellery to User's favourite
        user.favourite.add(jewellery)
        # Serialize User
        serialized_user = PopulatedUserSerializer(user)

        # Return User and 202 status
        return Response(serialized_user.data, status.HTTP_201_CREATED)


    def delete(self, request, pk):
        jewelleryId = request.data.get("jewelleryId")
      
    
         # Get User and Jewellery  objects
        user = self.get_object(User, pk)
        jewellery = self.get_object(Jewellery, jewelleryId)
        # Delete Jewellery to User's favourite
        user.favourite.remove(jewellery)
          # Return User and 204 status
        return Response(status = status.HTTP_204_NO_CONTENT)



