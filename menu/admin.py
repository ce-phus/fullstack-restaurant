from django.contrib import admin
from .models import Breakfast, Lunch, Dinner

class BreakfastAdmin(admin.ModelAdmin):
    list_display= ("name", "description", "price", "stock", "image")

class LunchAdmin(admin.ModelAdmin):
    list_display= ("name", "description", "price", "stock", "image")

class DinnerAdmin(admin.ModelAdmin):
    list_display= ("name", "description", "price", "stock", "image")

admin.site.register(Breakfast, BreakfastAdmin)
admin.site.register(Lunch, LunchAdmin)
admin.site.register(Dinner, DinnerAdmin)
