from django.shortcuts import render
from .models import TransactionModel, BillingAddress, OrderModel, OnlineReservationModel
from rest_framework import status
from rest_framework.views import APIView
from django.contrib.auth.models import User
from rest_framework.response import Response
from django.contrib.auth.hashers import make_password
from rest_framework import authentication, permissions
from rest_framework.decorators import permission_classes
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
# for login page
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import (
    UserSerializer,
    UserRegisterTokenSerializer,
    TransactionListSerializer,
    BillingAddressSerializer,
    ALLOrderListSerializer,
    OnlineReservationSerializer,
)

from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password

# Assuming you have imported UserRegisterTokenSerializer and RefreshToken correctly

class UserRegisterView(APIView):
    """To register the user"""

    def post(self, request, format=None):
        # holds username, first_name, last_name, password, and confirm_password in dict
        data = request.data
        username = data.get('username')
        first_name = data.get('first_name')
        last_name = data.get('last_name')
        email = data.get('email')
        password = data.get('password')
        confirm_password = data.get('confirm_password')

        # Check if any required field is missing
        if not all([username, first_name, last_name, email, password, confirm_password]):
            return Response({"detail": "Please provide all required fields"}, status=status.HTTP_400_BAD_REQUEST)

        # Check if passwords match
        if password != confirm_password:
            return Response({"detail": "Passwords do not match"}, status=status.HTTP_400_BAD_REQUEST)

        # Check if the username or email already exists
        if User.objects.filter(username=username).exists():
            return Response({"detail": "A user with that username already exists!"}, status=status.HTTP_403_FORBIDDEN)
        if User.objects.filter(email=email).exists():
            return Response({"detail": "A user with that email already exists!"}, status=status.HTTP_403_FORBIDDEN)

        # Create the user if all checks pass
        user = User.objects.create(
            username=username,
            email=email,
            first_name=first_name,
            last_name=last_name,
            password=make_password(password),
        )
        serializer = UserRegisterTokenSerializer(user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

            
# login user (customizing it so that we can see fields like username, email etc as a response
# from server, otherwise it will only provide access and refresh token)
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    
    def validate(self, attrs):
        data = super().validate(attrs)

        serializer = UserRegisterTokenSerializer(self.user).data

        for k, v in serializer.items():
            data[k] = v
        
        return data

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

# list all the transactions (of currently logged in user only)
class TransactionListView(APIView):
    permission_classes= [permissions.IsAuthenticated]

    def get(self, request):
        # show phonenumbers pf only that user which is equivalent to currently logged in user
        transactionphonenumbers= TransactionModel.objects.filter(user=request.user)
        serializer= TransactionListSerializer(transactionphonenumbers, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
# get user details
class UserAccountDetailsView(APIView):
    permission_classes= [permissions.IsAuthenticated]

    def get(self, request, pk):
        print(f"Received request for user ID: {pk}")
        try:
            user = User.objects.get(pk=pk)
            serializer = UserSerializer(user, many=False)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            print(f"User with ID {pk} not found.")
            return Response({"details": "User not Found"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            print(f"An unexpected error occurred: {str(e)}")
            return Response({"details": "An unexpected error occurred"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        
# Update user account
class UserAccountUpdateView(APIView):
    permission_classes=[permissions.IsAuthenticated]

    def put(self, request, pk):
        user =User.objects.get(id=pk)
        data = request.data

        if user:
            if request.user.id == user.id:
                user.username = data["username"]
                user.email = data["email"]
                user.first_name= data["first_name"]
                user.last_name= data["last_name"]

                if data["password"] != "":
                    user.password = make_password(data["password"])
                user.save()
                serializer= UserSerializer(user, many=False)
                message = {"details": "User Successfully Updated.", "user": serializer.data}
                return Response(message, status=status.HTTP_200_OK)
            else:
                return Response({"details": "Permission Denied"}, status=status.HTTP_403_FORBIDDEN)
        else:
            return Response({"details": "User Not Found."})
        
# delete user account
class UserAccountDeleteView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, pk):
        try:
            user_address = BillingAddress.objects.get(id=pk)

            if request.user.id == user_address.user.id:
                user_address.delete()
                return Response({"details": "Address successfully deleted."}, status=status.HTTP_204_NO_CONTENT)
            else:
                return Response({"details": "Permission denied."}, status=status.HTTP_403_FORBIDDEN)
        except:
            return Response({"details": "User Not Found."}, status=status.HTTP_404_NOT_FOUND)


# Get billing address (details of user addres, all addresses)
class UserAddressessListView(APIView):
    def get(self, request):
        user = request.user.id
        user_address = BillingAddress.objects.filter(user=user)
        serializer = BillingAddressSerializer(user_address, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)
    
# Get specific address only
class UserAddressDetailsView(APIView):
    def get(self, request, pk):
        user_address= BillingAddress.objects.get(id=pk)
        serializer = BillingAddressSerializer(user_address,many=False)
        return Response(serializer.data, status=status.HTTP_200_OK)

# create billing address
class CreateUserAddressView(APIView):

    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        data = request.data
        
        new_address = {
            "username": request.data["username"],
            "first_name": request.data["first_name"],
            "last_name": request.data["last_name"],
            "email" : request.data.get('email', ''),  # If email is not present, default to empty string
            "user": request.user.id,
            "phone_number": request.data["phone_number"],
            "pin_code": request.data["pin_code"],
            "house_no": request.data["house_no"],
            "landmark": request.data["landmark"],
            "city": request.data["city"],
            "state": request.data["state"],
        }

        serializer = BillingAddressSerializer(data=new_address, many=False)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
# edir billing address
class UpdateUserAddressView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    
    def put(self, request, pk):
        data = request.data

        try:
            user_address = BillingAddress.objects.get(id=pk)

            if request.user.id == user_address.user.id:

                updated_address = {
                    "username": data["username"] if data["username"] else user_address.username,
                    "first_name": data["first_name"] if data["first_name"] else user_address.first_name,
                    "last_name": data["last_name"] if data["last_name"] else user_address.last_name,
                    "user": request.user.id,
                    "phone_number": data["phone_number"] if data["phone_number"] else user_address.phone_number,
                    "pin_code": data["pin_code"] if data["pin_code"] else user_address.pin_code,
                    "house_no": data["house_no"] if data["house_no"] else user_address.house_no,
                    "landmark": data["landmark"] if data["landmark"] else user_address.landmark,
                    "city": data["city"] if data["city"] else user_address.city,
                    "state": data["state"] if data["state"] else user_address.state,
                }

                serializer = BillingAddressSerializer(user_address, data=updated_address)
                if serializer.is_valid():
                    serializer.save()
                    return Response(serializer.data, status=status.HTTP_200_OK)
                else:
                    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            else:
                return Response({"details": "Permission denied."}, status=status.HTTP_403_FORBIDDEN)
        except:
            return Response({"details": "Not Found."}, status=status.HTTP_404_NOT_FOUND)
        

# delete address
class DeleteUserAddressView(APIView):

    def delete(self, request, pk):
        
        try:
            user_address = BillingAddress.objects.get(id=pk)

            if request.user.id == user_address.user.id:
                user_address.delete()
                return Response({"details": "Address successfully deleted."}, status=status.HTTP_204_NO_CONTENT)
            else:
                return Response({"details": "Permission denied."}, status=status.HTTP_403_FORBIDDEN)
        except:
            return Response({"details": "Not found."}, status=status.HTTP_404_NOT_FOUND)

# ALL ORDERS LIST
class OrdersListView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        user_staff_status = request.user.is_staff

        if user_staff_status:
             all_user_orders= OrderModel.objects.all()
             serializer= ALLOrderListSerializer(all_user_orders, many=True)
             return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            all_orders = OrderModel.objects.filter(user=request.user)
            serializer = ALLOrderListSerializer(all_orders, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK) 

# change order delivery status
class ChangeOrderStatus(APIView):
    permission_classes = [permissions.IsAdminUser]

    def put(self, request, pk):
        data = request.data
        order = OrderModel.objects.get(id=pk)

        # only update this
        order.is_delivered = data["is_delivered"]
        order.delivered_at = data["delivered_at"]
        order.save()

        serializer = ALLOrderListSerializer(order, many=False)
        return Response(serializer.data, status=status.HTTP_200_OK)
            
# online reservation list
class OnlineReservationView(APIView):
    permission_classes= [permissions.IsAuthenticated]

    def post(self, request, *args, **kwargs):
        serializer = OnlineReservationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(username=request.user.username)  # Assign the username of the authenticated user
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class OnlineReservationListView(APIView):
    permission_classes=[permissions.IsAuthenticated]

    def get(self, request):
        # show reservations made of only that user which is equivalent to currently logged in user
        reservations= OnlineReservationModel.objects.filter(username=request.user.username)
        serializer= OnlineReservationSerializer(reservations, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)