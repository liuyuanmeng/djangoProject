from django.db import models

# Create your models here.


class Order(models.Model):
     owner = models.ForeignKey(
        'jwt_auth.User',
        related_name='orders',
        on_delete=models.CASCADE
    )
     jewellery = models.ForeignKey(
        'jewelleries.Jewellery',
        related_name='orders',
        on_delete= models.CASCADE,
       

    )
     quantity = models.IntegerField(default=1)
     start_date = models.DateTimeField(auto_now_add=True)
     ordered_date = models.DateTimeField()




