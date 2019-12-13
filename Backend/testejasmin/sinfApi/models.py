from django.core import serializers
from django.db import models


# Create your models here.
class Product(models.Model):
    name = models.TextField()
    description = models.TextField()

    def __str__(self):
        return serializers.serialize('json', [self])

    class Meta:
        db_table = "product"


class OrderRequest(models.Model):
    product_id = models.TextField()
    status = models.TextField()
    time = models.IntegerField()
    cust_invoice = models.TextField()
    sup_invoice = models.TextField()

    def __str__(self):
        return serializers.serialize('json', [self])

    class Meta:
        db_table = "order_request"

class MasterProductIdData(models.Model):
    id_supplier = models.TextField()
    id_customer = models.TextField()
    id_purchase_item = models.TextField()

    def __str__(self):
        return serializers.serialize('json', [self])

    class Meta:
        db_table = "master_prod_id_data"

