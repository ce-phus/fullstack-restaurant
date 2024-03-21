import logging
import json
from rest_framework.decorators import authentication_classes, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from menu.models import Breakfast, Lunch, Dinner
from menu.serializers import BreakfastSerializer, LunchSerializer, DinnerSerializer
from account.serializers import MpesaCheckoutSerializer
from account.models import OrderModel
from .mpesagateway import MpesaGateway
from rest_framework import permissions
from datetime import datetime

logger = logging.getLogger(__name__)

gateway =MpesaGateway()

@authentication_classes([])
@permission_classes((AllowAny,))
class MpesaCheckoutView(APIView):
    serializer_class = MpesaCheckoutSerializer

    def post(self, request, *args, **kwargs):
        # Extract item type and ID from URL parameters
        item_type = kwargs.get('type')  # 'breakfast', 'lunch', or 'dinner'
        item_id = kwargs.get('id')  
        logger.info("Received payload: {}".format(request.data))

        # Check if the extracted item type is valid
        if item_type not in ['breakfast', 'lunch', 'dinner']:
            return Response({"detail": "Invalid item type"}, status=status.HTTP_400_BAD_REQUEST)

        # Check if the item exists in the corresponding database table based on the item type
        try:
            if item_type == 'breakfast':
                item = Breakfast.objects.get(id=item_id)
            elif item_type == 'lunch':
                item = Lunch.objects.get(id=item_id)
            elif item_type == 'dinner':
                item = Dinner.objects.get(id=item_id)
            
        except (Breakfast.DoesNotExist, Lunch.DoesNotExist, Dinner.DoesNotExist):
            return Response({"detail": "Item not found"}, status=status.HTTP_404_NOT_FOUND)

        # Check if the item type from the payload matches the extracted item type
        if request.data.get('item_type') != item_type:
            return Response({"detail": "Invalid item type in payload"}, status=status.HTTP_400_BAD_REQUEST)

        # Proceed with payment request
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid(raise_exception=True):
            payload = {
                "data": serializer.validated_data,
                "item": item,  # Pass the item object to the payload
                "request": request
            }
            # Make the M-Pesa STK push request
            res = gateway.stk_push_request(payload)
            
            # If M-Pesa STK push was successful, create an order
            if res.get('success'):
                # Prepare order data
                order_data = {
                    "username": serializer.validated_data["username"],
                    "first_name": serializer.validated_data["first_name"],
                    "last_name": serializer.validated_data["last_name"],
                    "phone_number": serializer.validated_data["phone_number"],
                    "address": serializer.validated_data["address"],
                    "ordered_item": item.name,  # Assuming item has a name field
                    "paid_status": True,
                    "paid_at": datetime.now(),
                    "total_price": item.price,  # Assuming item has a price field
                    "is_delivered": False,
                    "delivered_at": None,
                    "user": request.user
                }
                
                # Create the order object
                new_order = OrderModel.objects.create(**order_data)

                # Return a success response with the order ID and a message
                return Response({
                    "success": True,
                    "order_id": new_order.id,
                    "message": "Payment successful. Order created."
                }, status=status.HTTP_200_OK)
            else:
                # Return the response from the M-Pesa gateway
                return Response(res)

        # Return response for invalid serializer data
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
@authentication_classes([])
@permission_classes((AllowAny,))
class MpesaCallBack(APIView):
    def get(self, request):
        return Response({"status": "OK"}, status=200)
    
    def post(self, request, *args, **kwargs):
        logging.info("{}".format("Callback from MPESA"))
        data = request.body
        return gateway.callback(json.loads(data))

# check token expired or not
class CheckTokenValidation(APIView):

    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        return Response("Token is Valid", status=status.HTTP_200_OK)