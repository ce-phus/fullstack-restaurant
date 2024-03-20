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
from .mpesagateway import MpesaGateway
from rest_framework import permissions

logger = logging.getLogger(__name__)

gateway =MpesaGateway()

@authentication_classes([])
@permission_classes((AllowAny,))
class MpesaCheckoutView(APIView):
    serializer_class = MpesaCheckoutSerializer

    def post(self, request, *args, **kwargs):
        item_type = kwargs.get('type')  # 'breakfast', 'lunch', or 'dinner'
        item_id = kwargs.get('id')  # ID of the item

        try:
            if item_type == 'breakfast':
                item = Breakfast.objects.get(id=item_id)
            elif item_type == 'lunch':
                item = Lunch.objects.get(id=item_id)
            elif item_type == 'dinner':
                item = Dinner.objects.get(id=item_id)
            else:
                return Response({"detail": "Invalid item type"}, status=status.HTTP_400_BAD_REQUEST)
        except (Breakfast.DoesNotExist, Lunch.DoesNotExist, Dinner.DoesNotExist):
            return Response({"detail": "Item not found"}, status=status.HTTP_404_NOT_FOUND)

        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid(raise_exception=True):
            payload = {
                "data": serializer.validated_data,
                "item": item,  # Pass the item object to the payload
                "request": request
            }
            res = gateway.stk_push_request(payload)
            return Response(res)
        
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