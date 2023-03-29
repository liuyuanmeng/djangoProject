from rest_framework import serializers
from django.contrib.auth import get_user_model, password_validation
from django.core.exceptions import ValidationError
from django.contrib.auth.hashers import make_password

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
      # we're gonna define password and password_confirmation fields as write_only
    password = serializers.CharField(write_only=True) # write_only=True ensures these are never returned when converting to JSON
    password_confirmation = serializers.CharField(write_only=True)

    def validate(self, data):
        password = data.pop('password')
        password_confirmation = data.pop('password_confirmation')
        if password != password_confirmation:
            raise ValidationError({
                'password_confirmation': 'Does not match password'
            })
             # Once we confirm passwords match, validate password strength
        try:
            password_validation.validate_password(password)
        except ValidationError as e:
            print('message', e)
            raise ValidationError({ 'error': e.messages })
        except Exception as e:
            print('message', e)
            raise Exception({ 'error': e })

        # Save hashed password to data
        data['password'] = make_password(password)

        # Return data
        return data

    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name', 'email', 'password', 'password_confirmation', 'favourite', 'order']

class SimpleUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id']