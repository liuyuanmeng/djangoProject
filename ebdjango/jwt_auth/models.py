from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class User(AbstractUser):
    email = models.CharField(max_length=50, unique=True)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    favourite = models.ManyToManyField('jewelleries.Jewellery', related_name='users', blank=True)
    order = models.ManyToManyField('orders.Order', related_name='users', blank=True)
