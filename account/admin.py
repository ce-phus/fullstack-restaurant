from django.contrib import admin
from .models import TransactionModel, BillingAddress, OrderModel, OnlineReservationModel


class TransactionModelAdmin(admin.ModelAdmin):
    list_display = ("id","transaction_no", "email", "phone_number", "checkout_request_id", "amount", "created", "reference", "receipt_no", "description")

class BillingAddressModelAdmin(admin.ModelAdmin):
    list_display = ("id","first_name", "last_name", "email", "user", "phone_number", "pin_code", "house_no", "landmark", "city", "state")

class OrderModelAdmin(admin.ModelAdmin):
    list_display = ("id","first_name", "last_name", "phone_number", "address", "ordered_item", "paid_status", "paid_at", "total_price", "is_delivered", "delivered_at", "user")

class OnlineReservationAdmin(admin.ModelAdmin):
    list_display= ('user', "phone_number", "num_persons", "reservation_date", "reservation_time", "message")


admin.site.register(TransactionModel, TransactionModelAdmin)
admin.site.register(BillingAddress, BillingAddressModelAdmin)
admin.site.register(OrderModel, OrderModelAdmin)
admin.site.register(OnlineReservationModel, OnlineReservationAdmin )