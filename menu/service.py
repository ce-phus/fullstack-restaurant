from decimal import Decimal
from django.conf import settings

from .serializers import BreakfastSerializer, LunchSerializer, DinnerSerializer
from .models import Breakfast, Lunch, Dinner

class CartService:
    def __init__(self, request):
        """Initialize the cart"""
        self.session = request.session
        cart = self.session.get(settings.CART_SESSION_ID)
        if not cart:
            # save an empty cart in session
            cart = self.session[settings.CART_SESSION_ID] = {}
        self.cart = cart

    def save(self):
        self.session.modified = True

    def add_item(self, item_type, price, item_id, quantity=1):
        """
        Add item to the cart or update its quantity
        """
        item_id = str(item_id)
        if item_id in self.cart:
            # If the item is already in the cart, update its quantity
            self.cart[item_id]["quantity"] += quantity
        else:
            # If the item is not in the cart, add it with the given quantity
            if price is None:
                # Handle the case where price is None
                raise ValueError("Price cannot be None when adding an item to the cart")
            
            total_price = Decimal(price) * quantity  # Calculate total price for the new item
            self.cart[item_id] = {
                "quantity": quantity,
                "price": str(price),  # Convert price to string before storing
                "item_type": item_type,
                "total_price": str(total_price)  # Store the total price
            }
        print("Item added with price:", price)
        
        self.save()

    def remove_item(self, item_id):
        """
        Remove an item from the cart and deduct its total price from the overall total price
        """
        item_id = str(item_id)
        if item_id in self.cart:
            item_data = self.cart[item_id]
            item_quantity = item_data["quantity"]
            item_type = item_data["item_type"]
            item_price = Decimal(0)

            # Fetch the item price based on its type and ID
            if item_type == 'breakfast':
                item = Breakfast.objects.get(id=item_id)
                item_price = Decimal(item.price)
            elif item_type == 'lunch':
                item = Lunch.objects.get(id=item_id)
                item_price = Decimal(item.price)
            elif item_type == 'dinner':
                item = Dinner.objects.get(id=item_id)
                item_price = Decimal(item.price)

            # Calculate the total price for the item to be removed
            item_total_price = item_price * item_quantity

            # Deduct the item's total price from the overall total price
            self.total_price -= item_total_price

            # Remove the item from the cart
            del self.cart[item_id]
            self.save()
    def __iter__(self):
        """
        Loop through cart items and fetch the items from the database
        """
        item_ids = self.cart.keys()

        for item_id in item_ids:
            item_data = self.cart[item_id]
            item_type = item_data["item_type"]

            if item_type == 'breakfast':
                item = Breakfast.objects.get(id=item_id)
                serializer = BreakfastSerializer(item)
                item_data["product"] = serializer.data
            elif item_type == 'lunch':
                item = Lunch.objects.get(id=item_id)
                serializer = LunchSerializer(item)
                item_data["product"] = serializer.data
            elif item_type == 'dinner':
                item = Dinner.objects.get(id=item_id)
                serializer = DinnerSerializer(item)
                item_data["product"] = serializer.data

            item_data["price"] = Decimal(item_data["price"])  # Convert price back to Decimal
            item_data["total_price"] = item_data["price"] * item_data["quantity"]
            
            yield item_data

    def get_total_price(self):
        total_price = Decimal(0)
        for item_id, item_data in self.cart.items():
            item_quantity = item_data["quantity"]
            item_type = item_data["item_type"]
            item_price = Decimal(0)

            # Fetch the item price based on its type and ID
            if item_type == 'breakfast':
                item = Breakfast.objects.get(id=item_id)
                item_price = Decimal(item.price)
            elif item_type == 'lunch':
                item = Lunch.objects.get(id=item_id)
                item_price = Decimal(item.price)
            elif item_type == 'dinner':
                item = Dinner.objects.get(id=item_id)
                item_price = Decimal(item.price)

            # Calculate the total price for the item and add it to the total price
            total_price += item_price * item_quantity

        return total_price.quantize(Decimal('.01'))  # Ensure precision and rounding





    def clear_cart(self):
        del self.session[settings.CART_SESSION_ID]
        self.save()
