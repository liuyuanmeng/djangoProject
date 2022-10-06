from django.db import models

# Create your models here.
class Jewellery(models.Model):
    name = models.CharField(max_length=100, default=None)
    image = models.CharField(max_length = 500)
    product_details = models.CharField(max_length=500, default=None)
    price = models.PositiveIntegerField(default=None)
    in_stock = models.BooleanField(default=True)
    categories = models.ManyToManyField(
        'categories.Category', # model that this field is related to
        related_name='jewelleries'
    )
    materials = models.ManyToManyField(
        'materials.Material',
        related_name='jewelleries'

    )
  
  


    def __str__(self): # pragma: no cover
        return f'{self.name}'
