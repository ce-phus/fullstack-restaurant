import logging
import time
from datetime import datetime
import requests
from requests.auth import HTTPBasicAuth
from backend.settings import env
import environ
import base64
from account.models import TransactionModel
from account.serializers import TransactionListSerializer
from phonenumber_field.phonenumber import PhoneNumber
from rest_framework.response import Response

env= environ.Env()
logging = logging.getLogger("default")

class MpesaGateway:
    shortcode = None
    consumer_key= None
    consumer_secret = None
    access_token_url = None
    access_token_expiration = None
    access_token = None
    timestamp = None

    def __init__(self) -> None:
        self.shortcode = env("shortcode")
        self.consumer_key= env("consumer_key")
        self.consumer_secret = env("consumer_secret")
        self.access_token_url = env("access_token_url")
        self.test_c2b_shortcode = env('test_c2b_shortcode')

        try:
            self.access_token = self.getAccessToken()
            if self.access_token is None:
                raise Exception("Request for access token failed")
        except Exception as e:
            logging.error("Error {}".format(e))
        else:
            self.access_token_expiration = time.time() + 3400
            self.timestamp =datetime.now().strftime("%Y%m%d%H%M%S")

    def getAccessToken(self):
        try:
            res = requests.get(
                self.access_token_url,
                auth=HTTPBasicAuth(self.consumer_key, self.consumer_secret)
            )
        except Exception as err:
            logging.error("Error {}". format(err))
        else:
            token =res.join()['access_token']
            return token
        
    @staticmethod
    def generate_password(shortcode, passkey, timestamp):
        password_str= f"{shortcode}{passkey}{timestamp}"
        password_bytes =password_str.encode("ascii")
        return base64.b64encode(password_bytes).decode("utf-8")
    
    @staticmethod
    def refresh_token(decorated):
        def wrapper(gateway, *args, **kwargs):
            if gateway.access_token_expiration and time.time() > gateway.access_token_expiration:
                token= gateway.getAccessToken()
                gateway.access_token =token
            return decorated(gateway, *args, **kwargs)
        return wrapper
    
    @refresh_token
    def stk_push_request(self, payload):
        logging.info("Received payload: {}".format(payload))

        api_url = "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest"
        # Instead of accessing payload["data"], access payload directly
        data = payload

        # Then, retrieve individual values from the payload as needed
        phone_number = data.get("phone_number")
        amount = data.get("amount")
        reference = data.get("reference")
        description = data.get("description")

        passkey = "bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919"
        password = self.generate_password(self.shortcode, passkey, self.timestamp)
        req_data = {
            "TestC2BShortcode": self.test_c2b_shortcode,
            "BusinessShortCode": self.shortcode,
            "Password": password,
            "Timestamp": self.timestamp,
            "TransactionType": "CustomerPayBillOnline",
            "Amount": amount,
            "PartyA": phone_number,
            "PartyB": self.shortcode,
            "PhoneNumber": phone_number,
            "CallBackURL": "https://sandbox.safaricom.co.ke/mpesa/",  # Add your callback URL here
            "AccountReference": "Test",
            "TransactionDesc": "Test",
        }

        try:
            res = requests.post(
                api_url,
                json=req_data,
                headers={"Authorization": f"Bearer {self.access_token}"},
                timeout=30
            )
            res_data = res.json()
            logging.info("Mpesa request data{}".format(req_data))
            logging.info("MPesa response info {}".format(res_data))

            if res.ok:
                request = payload.get("request")
                if request:
                    data["ip"] = request.META.get("REMOTE_ADDR")
                data["checkout_request_id"] = res_data.get("CheckoutRequestID")
                TransactionModel.objects.create(**data)
            return res_data
        except Exception as e:
            logging.error("Error: {}".format(e))
            return {"error": str(e)}

    # Now lets handle the callback. We are going to keep it simple. We won’t do error handling for the different types of failures such as invalid phone number (number that is not an mpesa number), or if the users phone is off etc. We simply generally handle failure and success.

    def check_status(self, data):
        try:
            status = data["Body"]["stkCallback"]["ResultCode"]
        except Exception as e:
            logging.error(f"Error: {e}")
            status =1

        return status
    
    def get_transaction_object(data):
        checkout_request_id= data["Body"]["stkCallback"]["ResultCode"]
        transaction, _ = TransactionModel.objects.get_or_create(
            checkout_request_id=checkout_request_id
        )
        return transaction
    
    def handle_successful_pay(self, data, transaction):
        items= data["Body"]["stkCallback"]["CallbackMetadata"]["Item"]
        for item in items:
            if item["Name"]== "Amount":
                amount = item["Value"]
            elif item["Name"] == "MpesaReceiptNumber":
                receipt_no = item["Value"]
            elif item["Name"] == "PhoneNumber":
                phone_number = item["Value"]

        transaction.amount = amount
        transaction.phone_number = PhoneNumber(raw_input=phone_number)
        transaction.receipt_no = receipt_no
        transaction.confirmed = True

        return transaction
    
    def callback_handler(self, data):
        status = self.check_status(data)
        transaction = self.get_transaction_object(data)
        if status ==0:
            self.handle_successful_pay(data, transaction)
        else:
            transaction.status =1
        
        transaction.status = status
        transaction.save()
        
        transaction_data = TransactionListSerializer(transaction).data

        logging.info("Transaction completed {}".format(transaction_data))

        return Response ({"status": "ok", "code": 0}, status=200)
