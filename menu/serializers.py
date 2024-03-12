from rest_framework import serializers
from .models import Breakfast, Lunch, Dinner

class BreakfastSerializer(serializers.ModelSerializer):
    class Meta:
        model= Breakfast
        fields = ["id", "name", "description", "price", "stock", "image"]

class LunchSerializer(serializers.ModelSerializer):
    class Meta:
        model= Lunch
        fields = ["id", "name", "description", "price", "stock", "image"]

class DinnerSerializer(serializers.ModelSerializer):
    class Meta:
        model= Dinner   
        fields = ["id", "name", "description", "price", "stock", "image"]