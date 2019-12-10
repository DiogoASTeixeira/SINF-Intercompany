import json
import time
from datetime import date, datetime

import requests
from django.http import HttpResponse
from rest_framework.response import Response
from rest_framework.utils import json
from rest_framework.views import APIView
from .models import OrderRequest, MasterProductIdData
from .enums import OrderRequestState
from .models import MasterProductIdData

# Create your views here.

JASMIN_URL = "my.jasminsoftware.com/api"

SUPP_NAME = "SINF2"
SUPP_CLI_ID = "SINF2SUPPLIER"
SUPP_SECRET = "2cd3bd11-0686-466f-bd45-c61d20205875"
SUPP_TOKEN = ""
SUPP_TENANT = "227418"
SUPP_ORG = "227418-0001"
SUPP_PARTY = "0004"

CUST_NAME = "W-SINF"
CUST_CLI_ID = "SINF2Companies"
CUST_SECRET = "bece356b-f951-4c41-b843-694992031e9c"
CUST_TOKEN = ""
CUST_TENANT = "224989"
CUST_ORG = "224989-0001"
CUST_PARTY = "0006"

class Teste(APIView):
    def get(self, request):
        return Response("ola")

class Request(APIView):
    def post(self, request, id_prod):
        time_int = int(round(time.time()))
        print(time)
        new = OrderRequest(product_id=id_prod, status=OrderRequestState.PENDING.value, time=time_int)
        new.save()
        return HttpResponse("Added product with ID: " + id_prod, status=201)

    def get(self, request):
        status = request.GET.get('status')
        if status is None:
            orders = OrderRequest.objects.values()
        else:
            orders = OrderRequest.objects.values().filter(status=status)



        dict = []

        for order in orders:
            dict.append(ProductDetails.get(self, request, order['product_id']).data)

        for item in dict:
            item['status'] = order['status']
            item['id'] = order['id']

        return Response(dict)

    def delete(self, request, id_order):
        OrderRequest.objects.filter(id=id_order).delete()
        return HttpResponse(status=200)

class RejectRequest(APIView):
    def patch(self, request, id_req):
        req = OrderRequest.objects.get(id=id_req)
        if (req.status != OrderRequestState.PENDING):
            return HttpResponse("Request not pending with ID: " + id_req, status=400)

        req.status = OrderRequestState.REJECTED.value
        req.save()

        return HttpResponse("Rejected order request with ID: " + id_req, status=200)

class AcceptRequest(APIView):
    def patch(self, request, id_req):

        req = OrderRequest.objects.get(id=id_req)
        if(req.status != OrderRequestState.PENDING):
            return HttpResponse("Request not pending with ID: " + id_req, status=400)

        req.status = OrderRequestState.ACCEPTED.value
        req.save()

        Auth.get(self, request)  # TODO: Remove
        prod = ProductDetails.get(self,request, req.product_id).data

        response = requests.post( "https://" + JASMIN_URL + "/" + CUST_TENANT + "/" + CUST_ORG + "/purchasesCore/purchasesItems",
                                 headers={
                                     'Authorization': CUST_TOKEN,
                                     'Content-Type': 'application/json'
                                 }, json={
                "itemKey": prod['name'],
                "description": prod['description'],
                "unit":"UN",
                "itemTaxSchema":"IVA-TN",
                "image":  prod['image'],
            }, )

        if(response.status_code == 201):
            id_purchase = response.text[1:len(response.text) - 1]
            product_detail = PurchaseItem.getId(id_purchase)
            master_entry = MasterProductIdData(id_supplier=prod['id_product'], id_customer=product_detail['id_prod'],id_purchase_item=id_purchase)
            master_entry.save()
        else:
            existing_master = MasterProductIdData.objects.get(id_supplier=prod['id_product'])
            id_purchase = existing_master.id_purchase_item
            product_detail = PurchaseItem.getId(id_purchase)


        today = datetime.now();

        dtoday = today.strftime("%Y-%m-%dT%H:%M:%S")
        serie = "TESTE"#today.strftime("%Y")

        response1 = requests.post(
            "https://" + JASMIN_URL + "/" + CUST_TENANT + "/" + CUST_ORG + "/invoiceReceipt/invoices",
            headers={
                'Authorization': CUST_TOKEN,
                'Content-Type': 'application/json'
            }, json={
                "documentType": "VFA",
                "serie": serie,
                "company": CUST_NAME,
                "paymentTerm": "01",
                "paymentMethod": "TRA",
                "currency": "EUR",
                "documentDate": dtoday,
                "postingDate": dtoday,
                "sellerSupplierParty": SUPP_PARTY,
                "exchangeRate": 1,
                "discount": 0,
                "loadingCountry": "PT",
                "unloadingCountry": "PT",
                "deliveryTerm": "NA",
                "documentLines": [
                  {
                    "PurchasesItem": product_detail['itemKey'],
                    "quantity": 1,
                    "unitPrice": {
                            "amount": prod['price']
                        }
                  },
                ]
            }, )

        response2 = requests.post(
            "https://" + JASMIN_URL + "/" + SUPP_TENANT + "/" + SUPP_ORG + "/billing/invoices/",
            headers={
                'Authorization': SUPP_TOKEN,
                'Content-Type': 'application/json'
            }, json={
                    "documentType": "FA",
                    "serie": serie,
                    "seriesNumber": 1,
                    "company": SUPP_NAME,
                    "paymentTerm": "01",
                    "paymentMethod": "TRA",
                    "currency": "EUR",
                    "documentDate": dtoday,
                    "postingDate": dtoday,
                    "buyerCustomerParty": CUST_PARTY,
                    "exchangeRate": 1,
                    "discount": 0,
                    "loadingCountry": "PT",
                    "unloadingCountry": "PT",
                    "isExternal": "false",
                    "isManual": "false",
                    "isSimpleInvoice": "false",
                    "isWsCommunicable": "false",
                    "deliveryTerm": "V-VIATURA",
                    "documentLines": [
                      {
                        "salesItem": prod['name'],
                        "description":prod['description'],
                        "quantity": 1,
                        "unitPrice": {
                                "amount": prod['price'],
                                "baseAmount": prod['price'],
                                "reportingAmount": prod['price'],
                                "fractionDigits": 2,
                                "symbol": "€"
                            },
                        "unit": "UN",
                        "itemTaxSchema": "IVA-TN",
                        "deliveryDate": dtoday
                      }
                    ],
                    "WTaxTotal" : { "amount": 0,
                        "baseAmount": 0,
                        "reportingAmount": 0,
                        "fractionDigits": 2,
                        "symbol": "€"},
                        "TotalLiability" : {
                          "baseAmount": 0,
                          "reportingAmount": 0,
                          "fractionDigits": 2,
                          "symbol": "€"
                          }
            }, )

        return HttpResponse("Accepted order request with ID: " + id_req, status=200)

class ProductList(APIView):
    def get(self, request):
        response = requests.get(
            "https://" + JASMIN_URL + "/" + SUPP_TENANT + "/" + SUPP_ORG + "/salesCore/salesItems",
            headers={
                'Authorization': SUPP_TOKEN,
                'Content-Type': 'application/json'
            })

        dict = []

        data = response.json()

        for item in data:
            print(item['itemKey'])
            temp_dict = {
                'name': item['itemKey'],
                'price': item['priceListLines'][0]['priceAmount']['amount'],
                'id': item['priceListLines'][0]['salesItemId']
            }
            dict.append(temp_dict)

        return Response(dict)

class PurchaseItem(APIView):
    def getId(id_pit):
        response = requests.get(
            "https://" + JASMIN_URL + "/" + CUST_TENANT + "/" + CUST_ORG + "/purchasesCore/purchasesItems/"+id_pit,
            headers={
                'Authorization': CUST_TOKEN,
                'Content-Type': 'application/json'
            })
        data = json.loads(response.text)
        dict = {
            'id_prod': data['baseEntityId'],
            'itemKey': data['itemKey']
        }
        return dict

class ProductDetails(APIView):
    def get(self, request, id_prod):
        response = requests.get(
            "https://" + JASMIN_URL + "/" + SUPP_TENANT + "/" + SUPP_ORG + "/salesCore/salesItems/" + id_prod,
            headers={
                'Authorization': SUPP_TOKEN,
                'Content-Type': 'application/json'
            })

        data = response.json()

        dict = {
            'name': data['itemKey'],
            'price': data['priceListLines'][0]['priceAmount']['amount'],
            'id_product': data['priceListLines'][0]['salesItemId'],
            'description': data['description'],
            'image': data['image'],
            'thumbnail': data['imageThumbnail']
        }

        return Response(dict)

class Auth(APIView):
    def get(self, request):
        response = requests.post("https://identity.primaverabss.com/connect/token",
                                 headers={
                                     'Content-type': 'application/x-www-form-urlencoded'
                                 }, data={
                "grant_type": "client_credentials",
                "client_id": CUST_CLI_ID,
                "client_secret": CUST_SECRET,
                "scope": "application"
            }, )

        content = json.loads(response.text)
        global CUST_TOKEN
        CUST_TOKEN = content['token_type'] + " " + content["access_token"]

        print(response)

        response = requests.post("https://identity.primaverabss.com/connect/token",
                                 headers={
                                     'Content-type': 'application/x-www-form-urlencoded'
                                 }, data={
                "grant_type": "client_credentials",
                "client_id": SUPP_CLI_ID,
                "client_secret": SUPP_SECRET,
                "scope": "application"
            }, )

        content = json.loads(response.text)
        global SUPP_TOKEN
        SUPP_TOKEN = content['token_type'] + " " + content["access_token"]

        return HttpResponse(response, content_type="application/json")
