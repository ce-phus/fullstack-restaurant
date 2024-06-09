from django.shortcuts import render, get_object_or_404
from .models import Breakfast, Lunch, Dinner
from rest_framework import status
from rest_framework.views import APIView
from .serializers import BreakfastSerializer, LunchSerializer, DinnerSerializer
from rest_framework.response import Response
from rest_framework import authentication, permissions
from rest_framework.decorators import permission_classes

from django.http import HttpRequest 

from .service import CartService

class BreakfastView(APIView):
    def get(self, request):
        breakfast_menus= Breakfast.objects.all()
        serializer = BreakfastSerializer(breakfast_menus, many= True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class BreakfastDetailView(APIView):
    def get(self, request, pk):
        try:
            breakfast_menu= Breakfast.objects.get(id=pk)
            serializer= BreakfastSerializer(breakfast_menu)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Breakfast.DoesNotExist:
            return Response({"detail": "Breakfast Menu not found"}, status=status.HTTP_404_NOT_FOUND)
        
class BreakfastCreateView(APIView):
    permission_classes=[permissions.IsAdminUser]

    def post(self, request):
        user =request.user
        data= request.data

        breakfast_menu ={
            "name": data["name"],
            "description": data["description"],
            "price": data["price"],
            "stock": data["stock"],
            "image": data["image"],
        }
        serializer = BreakfastSerializer(data=breakfast_menu, many=False)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response({"detail": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
        
class BreakfastDeleteView(APIView):
    permission_classes= [permissions.IsAdminUser]

    def delete(self, request, pk):
        try:
            breakfast_menu= Breakfast.objects.get(id=pk)
            breakfast_menu.delete()
            return Response({"detail": "Breakfast Menu successfully deleted"}, status=status.HTTP_204_NO_CONTENT)
        except:
            return Response({"detail": "Not Found."}, status=status.HTTP_404_NOT_FOUND)
        

class BreakfastEditView(APIView):
    permission_classes= [permissions.IsAdminUser]

    def put(self, request, pk):
        data= request.data
        breakfast_menu = Breakfast.objects.get(id=pk)

        updated_breakfast_menu= {
            "name": data["name"] if data["name"] else breakfast_menu.name,
            "description": data["description"] if data["description"] else breakfast_menu.description,
            "price": data["price"] if data["price"] else breakfast_menu.price,
            "stock": data["stock"],
            "image": data["image"] if data["image"] else breakfast_menu.image,
        }

        serializer = BreakfastSerializer(breakfast_menu, data=updated_breakfast_menu)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response({"detail": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
        
class LunchView(APIView):
    def get(self, request):
        lunch_menus= Lunch.objects.all()
        serializer = LunchSerializer(lunch_menus, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
class LunchDetailView(APIView):
    def get(self, request, pk):
        try:
            lunch_menu= Lunch.objects.get(id=pk)
            serializer = LunchSerializer(lunch_menu)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Lunch.DoesNotExist():
            return Response({"detail": "Lunch Menu not found"}, status=status.HTTP_404_NOT_FOUND)
        
class LunchCreateView(APIView):
    def post(self, request):
        user = request.user
        data = request.data

        lunch_menu ={
            "name": data["name"],
            "description": data["description"],
            "price": data["price"],
            "stock": data["stock"],
            "image": data["image"]
        }

        serializer = LunchSerializer(data=lunch_menu, many=False)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response({"detail": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

class LunchDeleteVIew(APIView):
    permission_classes= [permissions.IsAdminUser]

    def delete(self, request, pk):
        try:
            lunch_menu= Lunch.objects.get(id=pk)
            lunch_menu.delete()
            return Response({"detail": "Product successfully deleted"}, status=status.HTTP_204_NO_CONTENT)
        except:
            return Response({"detail": "Not Found."}, status=status.HTTP_404_NOT_FOUND)
        
class LunchEditView(APIView):
    permission_classes= [permissions.IsAdminUser]

    def put(self, request, pk):
        data = request.data
        lunch_menu =Lunch.objects.get(id=pk)

        updated_product = {
            "name": data["name"] if data["name"] else lunch_menu.name,
            "description": data["description"] if data["description"] else lunch_menu.description,
            "price": data["price"] if data["price"] else lunch_menu.price,
            "stock": data["stock"],
            "image": data["image"] if data["image"] else lunch_menu.image,
            "image_field": data["image_field"] if data["image_field"] else lunch_menu.image_field,
        }
        
        serializer = LunchSerializer(lunch_menu, data=updated_product)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response({"detail": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
        

class DinnerVIew(APIView):
    def get(self, request):
        dinner_menus = Dinner.objects.all()
        serializers = DinnerSerializer(dinner_menus, many=True)
        return Response(serializers.data, status=status.HTTP_200_OK)
    
class DinnerDetailView(APIView):
    def get(self, request, pk):
        try:
            dinner_menu= Dinner.objects.get(id=pk)
            serializers= DinnerSerializer(dinner_menu)
            return Response(serializers.data, status=status.HTTP_200_OK)
        except Dinner.DoesNotExist():
            return Response({"detail", "Dinner Menu Does Not Exist"}, status=status.HTTP_404_NOT_FOUND)
        
class DinnerCreateView(APIView):
    permission_classes=[permissions.IsAdminUser]

    def post(self, request):
        user = request.user
        data =request.data

        dinner_menu = {
            "name": data["name"],
            "description": data["description"],
            "price": data["price"],
            "stock": data["stock"],
            "image": data["image"]
        }

        serializer = DinnerSerializer(data=dinner_menu, many=False)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response({"detail": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
        
class DinnerDeleteView(APIView):
    permission_classes = [permissions.IsAdminUser]

    def delete(self, request, pk):
        try:
            dinner_menu= Dinner.objects.get(id=pk)
            dinner_menu.delete()
            return Response({"detail": "Dinner Menu successfully deleted"}, status=status.HTTP_204_NO_CONTENT)
        except:
            return Response({"detail": "Not Found."}, status=status.HTTP_404_NOT_FOUND)
        
class DinnerEditView(APIView):
    permission_classes = [permissions.IsAdminUser]

    def put(self, request, pk):
        data = request.data
        dinner_menu = Dinner.objects.get(id=pk)

        updated_dinner_menu = {
            "name": data["name"] if data["name"] else dinner_menu.name,
            "description": data["description"] if data["description"] else dinner_menu.description,
            "price": data["price"] if data["price"] else dinner_menu.price,
            "stock": data["stock"],
            "image": data["image"] if data["image"] else dinner_menu.image,
        }
        
        serializer = DinnerSerializer(dinner_menu, data=updated_dinner_menu)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response({"detail": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
        

class CartAPIView(APIView):

    allowed_methods = ['POST', 'GET']  # Add 'POST' here
    def post(self, request, *args, **kwargs):
        cart_service = CartService(request)
        action = request.data.get("action")

        if action == "add_item":
            item_type = request.data.get("type")
            item_id = request.data.get("id")
            quantity = int(request.data.get("quantity", 1))

            cart_service.add_item(item_type, item_id, quantity)
            total_price = cart_service.get_total_price()
            cart_details = cart_service.get_cart_details()
            

            return Response({"cart_items": cart_details, "total_price": str(total_price)}, status=status.HTTP_200_OK)
        elif action == "remove_item":
            item_id = request.data.get("id")
            cart_service.remove_item(item_id)

            cart_details = cart_service.get_cart_details()
            total_price = cart_service.get_total_price()

            return Response({"cart_items": cart_details, "total_price": str(total_price)}, status=status.HTTP_200_OK)
        elif action == "clear_cart":
            cart_service.clear_cart()
            return Response({"detail": "Cart cleared"}, status=status.HTTP_200_OK)
        else:
            return Response({"detail": "Invalid action"}, status=status.HTTP_400_BAD_REQUEST)
        
    def get(self, request, *args, **kwargs):
        cart_service = CartService(request)
        total_price = cart_service.get_total_price()
        return Response({"total_price": str(total_price)}, status=status.HTTP_200_OK)