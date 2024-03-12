from decimal import Decimal
from django.conf import settings

from .serializers import BreakfastSerializer, LunchSerializer, DinnerSerializer
from .models import Breakfast, Lunch, Dinner

class CartService:
    def __init__(self, request):
        self.session = request.session
        cart = self.session.get(settings.CART_SESSION_ID)
        if not cart:
            cart = self.session[settings.CART_SESSION_ID] = {}
        self.cart = cart

    def save(self):
        self.session.modified = True

    def add_item(self, item_type, item_id, quantity=1):
        if item_type == 'breakfast':
            item = Breakfast.objects.get(id=item_id)
        elif item_type == 'lunch':
            item = Lunch.objects.get(id=item_id)
        elif item_type == 'dinner':
            item = Dinner.objects.get(id=item_id)
        else:
            raise ValueError("Invalid item type")

        item_id = str(item.id)
        if item_id not in self.cart:
            self.cart[item_id] = {
                'quantity': quantity,
                'price': str(item.price)
            }
        else:
            self.cart[item_id]['quantity'] += quantity
        self.save()

    def remove_item(self, item_id):
        item_id = str(item_id)
        if item_id in self.cart:
            del self.cart[item_id]
            self.save()

    def __iter__(self):
        """
        Loop through cart items and fetch the items from the database
        """
        item_ids = self.cart.keys()

        breakfasts = Breakfast.objects.filter(id__in=item_ids)
        lunches = Lunch.objects.filter(id__in=item_ids)
        dinners = Dinner.objects.filter(id__in=item_ids)

        cart = self.cart.copy()

        for item_id, item_data in cart.items():
            if item_id in breakfasts.values_list('id', flat=True):
                item = breakfasts.get(id=item_id)
                serializer = BreakfastSerializer(item)
                item_data["product"] = serializer.data
            elif item_id in lunches.values_list('id', flat=True):
                item = lunches.get(id=item_id)
                serializer = LunchSerializer(item)
                item_data["product"] = serializer.data
            elif item_id in dinners.values_list('id', flat=True):
                item = dinners.get(id=item_id)
                serializer = DinnerSerializer(item)
                item_data["product"] = serializer.data

            item_data["price"] = Decimal(item_data["price"]) 
            item_data["total_price"] = item_data["price"] * item_data["quantity"]
            
            yield item_data

    def get_total_price(self):
        total_price = Decimal(0)
        for item_id, item_data in self.cart.items():
            item_price = Decimal(item_data['price'])
            item_quantity = item_data['quantity']
            total_price += item_price * item_quantity
        return total_price

    def clear_cart(self):
        del self.session[settings.CART_SESSION_ID]
        self.save()
