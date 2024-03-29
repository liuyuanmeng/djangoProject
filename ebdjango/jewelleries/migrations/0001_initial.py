# Generated by Django 4.1.1 on 2022-09-22 16:14

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('materials', '0001_initial'),
        ('categories', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Jewellery',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(default=None, max_length=100)),
                ('image', models.CharField(max_length=500)),
                ('product_details', models.CharField(default=None, max_length=500)),
                ('price', models.PositiveIntegerField(default=None)),
                ('in_stock', models.BooleanField(default=True)),
                ('categories', models.ManyToManyField(related_name='jewelleries', to='categories.category')),
                ('materials', models.ManyToManyField(related_name='jewelleries', to='materials.material')),
            ],
        ),
    ]
