from .models import TransactionModel, BillingAddress, OrderModel, OnlineReservationModel
from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from django.core.exceptions import ValidationError
from payments.validators import validate_possible_number

class UserSerializer(serializers.ModelSerializer):
    admin = serializers.SerializerMethodField(source='is_staff', read_only=True)

    class Meta:
        model=User
        fields=["id", "username","first_name", "last_name", "email", "admin",]

    def get_admin(self, obj):
        return obj.is_staff

# creating tokens manually *with user regsitration we will also create tokens
class UserRegisterTokenSerializer(UserSerializer):
    token = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ["id", "username", "first_name", "last_name", "email",  "token"]

    def get_token(self,obj):
        token= RefreshToken.for_user(obj)
        return str(token.access_token)
    
# List of transactions
    
class MpesaCheckoutSerializer(serializers.ModelSerializer):
    first_name = serializers.CharField(required=True)
    last_name = serializers.CharField(required=True)

    class Meta:
        model = TransactionModel
        fields = (
            "phone_number",
            "amount",
            "reference",
            "description",
            "first_name",
            "last_name",
        )
    def validate_phone_number(self, phone_number):
        """A very basic validation to remove the preciding + or replace the 0 with 254
        """
        if phone_number[0] == "+":
            phone_number = phone_number[1:]
        if phone_number[0] == "0":
            phone_number= "254" + phone_number[1:]

        try:
            validate_possible_number(phone_number, "KE")
        except ValidationError:
            raise serializers.ValidationError({"error": "Phone number is not valid" })
        
        return phone_number
    
    def validate_amount(self, amount):
        """this model validates the amount"""
        if not amount or float(amount) <= 0:
            raise serializers.ValidationError({
                "error": "Amount must be greater than zero"
            }
            )
                
        return amount
        
    
    def validate_reference(self, reference):
        """Write your validation logic here"""
        if reference:
            return reference
        return "Test"
    
    def validate_description(self, description):
        """Write your validation logic here"""
        if description:
            return description
        return "Test"
    
    def validate(self, data):
        """
        Validate the serializer data, including first_name and last_name.
        """
        first_name = data.get('first_name')
        last_name = data.get('last_name')

        # Perform additional validation for first_name and last_name if needed

        return data

class TransactionListSerializer(serializers.ModelSerializer):

    class Meta:
        model= TransactionModel
        fields= "__all__"

# billing address details
class BillingAddressSerializer(serializers.ModelSerializer):
    
    class Meta:
        model= BillingAddress
        fields= "__all__"

# all order list
class ALLOrderListSerializer(serializers.ModelSerializer):

    class Meta:
        model = OrderModel
        fields = "__all__"

# online reservation list
class OnlineReservationSerializer(serializers.ModelSerializer):

    class Meta:
        model = OnlineReservationModel
        fields = "__all__"
