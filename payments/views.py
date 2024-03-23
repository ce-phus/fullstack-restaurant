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
from django.shortcuts import get_object_or_404

logger = logging.getLogger(__name__)

gateway =MpesaGateway()


class MpesaCheckoutView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, id, item_type, format=None):
        # Log the received payload
        print("Received payload: {}".format(request.data))

        # Validate item_type and find the corresponding item
        model_map = {
            'breakfast': Breakfast,
            'lunch': Lunch,
            'dinner': Dinner,
        }
        if item_type not in model_map:
            return Response({"detail": "Invalid item type"}, status=status.HTTP_400_BAD_REQUEST)

        model = model_map[item_type]
        item = get_object_or_404(model, pk=id)

        # Validate and save the incoming data with the serializer
        serializer = MpesaCheckoutSerializer(data=request.data)
        if serializer.is_valid():
            # If the data is valid, proceed with payment and order creation logic
            # Simulate payment success
            payment_success = True  # Placeholder for actual payment gateway integration
            
            if payment_success:
                # Make the STK push request
                stk_push_response = gateway.stk_push_request(serializer.validated_data)

                if stk_push_response.get('success'):
                    # Assuming successful payment logic here, create the order, etc.
                    order_data = {
                        "first_name": serializer.validated_data.get("first_name"),
                        "last_name": serializer.validated_data.get("last_name"),
                        "phone_number": serializer.validated_data.get("phone_number"),
                        "address": serializer.validated_data.get("address"),
                        "ordered_item": item.name,
                        "paid_status": True,
                        "paid_at": datetime.now(),
                        "total_price": item.price,
                        "is_delivered": False,
                        "delivered_at": None,
                        "user": request.user
                    }
                    
                    # Create the order object
                    # Assuming you have a model named OrderModel for orders
                    new_order = OrderModel.objects.create(**order_data)

                    # Return a success response with the order ID and a message
                    return Response({
                        "success": True,
                        "order_id": new_order.id,
                        "message": "Payment successful. Order created."
                    }, status=status.HTTP_200_OK)
                else:
                    return Response(stk_push_response, status=status.HTTP_400_BAD_REQUEST)
            else:
                return Response({"success": False, "message": "Payment failed."}, status=status.HTTP_400_BAD_REQUEST)
        else:
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