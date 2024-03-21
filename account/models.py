import uuid
from django.db import models
from django.contrib.auth.models import User
from phonenumber_field.modelfields import PhoneNumberField
from django.core.validators import RegexValidator
from django.utils.translation import gettext_lazy as _


STATUS= ((1, "Pending"), (0, "Complete"))

class TransactionModel(models.Model):
    """This model records all the mpesa payment transactions"""
    transaction_no= models.CharField(default=uuid.uuid4, max_length=50, unique=True)
    phone_number= PhoneNumberField(null=False, blank=False)
    checkout_request_id= models.CharField(max_length=200)
    reference= models.CharField(max_length=40, blank=True)
    description= models.TextField(null=True, blank=True)
    amount= models.CharField(max_length=10)
    status= models.CharField(max_length=15, choices=STATUS, default=1)
    receipt_no= models.CharField(max_length=200, blank=True, null=True)
    email= models.EmailField(null=True, blank=True)
    created=  models.DateTimeField(auto_now_add=True)
    ip= models.CharField(max_length=200, blank=True, null=True)

    def __unicode__(self):
        return f"{self.transaction_no}"


class BillingAddress(models.Model):
    first_name = models.CharField(max_length=200, null=False, blank=False)
    last_name = models.CharField(max_length=200, null=False, blank=False)
    email= models.CharField(verbose_name=_("Email Address"), max_length=255, unique=True)
    user =  models.ForeignKey(User, related_name="billingmodel", on_delete=models.CASCADE, null=True, blank=True)
    phone_number= PhoneNumberField(null=False, blank=False)
    pin_code = models.CharField(max_length=6, validators=[RegexValidator(r'^\d{0,9}$')], null=False, blank=False)
    house_no = models.CharField(max_length=300, null=False, blank=False)
    landmark = models.CharField(max_length=120, null=False, blank=False)
    city = models.CharField(max_length=120, null=False, blank=False)
    state = models.CharField(max_length=120, null=False, blank=False)
    new_field = models.CharField(max_length=140, default='SOME STRING', null=True, blank=True)


    def __str__(self):
        return f"{self.first_name}{self.last_name}"
    


class OrderModel(models.Model):
    first_name = models.CharField(max_length=120, null=False, blank= False)
    last_name = models.CharField(max_length=120, null=False, blank= False)
    ordered_item = models.CharField(max_length=200, null=True, blank=True, default="Not Set")
    phone_number= PhoneNumberField(null=False, blank=False)
    address = models.CharField(max_length=300, null=True, blank=True)
    paid_status = models.BooleanField(default=False)
    paid_at = models.DateTimeField(auto_now_add=False, null=True, blank=True)
    total_price = models.DecimalField(max_digits=8, decimal_places=2, null=True, blank=True)
    is_delivered = models.BooleanField(default=False)
    delivered_at = models.CharField(max_length=200, null=True, blank=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    new_field = models.CharField(max_length=140, default='SOME STRING')

    def __str__(self):
        return f"{self.first_name}{self.last_name}"

class OnlineReservationModel(models.Model):
    user = models.CharField(max_length=120)
    first_name = models.CharField(max_length=120, null=False, blank= False)
    last_name = models.CharField(max_length=120, null=False, blank= False)
    phone_number = PhoneNumberField(null=False, blank=False)
    num_persons = models.CharField(max_length=20, default="1 Persons")
    reservation_date = models.DateField()
    reservation_time= models.TimeField()
    message = models.CharField(max_length=500, default="Please enter any additional requests or information regarding your reservation")

    def __str__(self):
        return f"{self.first_name}{self.last_name}"