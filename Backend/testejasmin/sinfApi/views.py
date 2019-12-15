import calendar
import json
import time
from datetime import date, datetime

import requests
from django.contrib.auth.models import Group
from django.http import HttpResponse
from rest_framework.response import Response
from rest_framework.utils import json
from rest_framework.views import APIView
from .models import OrderRequest
from .enums import OrderRequestState
from .models import MasterProductIdData
from rest_framework.permissions import IsAuthenticated, BasePermission
from collections import Counter
from datetime import datetime
# Create your views here.

JASMIN_URL = "my.jasminsoftware.com/api"

SUPP_NAME = "SINF2"
SUPP_CLI_ID = "SINF2SUPPLIER"
SUPP_SECRET = "0c78ac45-98bd-4036-9cf1-4af89b3dc833"
SUPP_TOKEN = ""
SUPP_TENANT = "227418"
SUPP_ORG = "227418-0001"
SUPP_PARTY = "0003"

CUST_NAME = "W-SINF"
CUST_CLI_ID = "SINF2COMPANIES"
CUST_SECRET = "6e95f18f-4ae8-485e-a3e0-ae301a86ea43"
CUST_TOKEN = ""
CUST_TENANT = "224989"
CUST_ORG = "224989-0001"
CUST_PARTY = "0001"

class IsCustomer(BasePermission):

    def has_permission(self, request, view):
        if(request.user.groups.first().name == "customer"):
            return True
        return False

class IsSupplier(BasePermission):
    def has_permission(self, request, view):
        if (request.user.groups.first().name == "supplier"):
            return True
        return False

class Request(APIView):
    #permission_classes = (IsAuthenticated,)

    def post(self, request, id_prod):
        time_int = int(round(time.time()))
        print(time)
        new = OrderRequest(product_id=id_prod, status=OrderRequestState.PENDING.value, time=time_int)
        new.save()
        return HttpResponse("Added product with ID: " + id_prod, status=201)

    def get(self, request):
        status = request.GET.get('status')
        group = Group(id=1)
        print(request.user.groups.first())
        if status is None:
            orders = OrderRequest.objects.values()
        else:
            orders = OrderRequest.objects.values().filter(status=status)

        dict = []

        for order in orders:
            dict.append(ProductDetails.get(self, request, order['product_id']).data)

        i = 0

        for item in dict:
            item['time'] = orders[i]['time']
            item['status'] = orders[i]['status']
            item['id'] = orders[i]['id']
            i = i + 1

        return Response(dict)

    def delete(self, request, id_order):
        OrderRequest.objects.filter(id=id_order).delete()
        return HttpResponse(status=200)

class RejectRequest(APIView):
    #permission_classes = (IsAuthenticated,)

    def patch(self, request, id_req):
        req = OrderRequest.objects.get(id=id_req)
        if (req.status != OrderRequestState.PENDING.value):
            return HttpResponse("Request not pending with ID: " + id_req, status=400)

        req.status = OrderRequestState.REJECTED.value
        req.save()

        return HttpResponse("Rejected order request with ID: " + id_req, status=200)

class AcceptRequest(APIView):
    #permission_classes = (IsAuthenticated,)

    def patch(self, request, id_req):

        req = OrderRequest.objects.get(id=id_req)
        if(req.status != OrderRequestState.PENDING.value):
            return HttpResponse("Request not pending with ID: " + id_req, status=400)

        req.status = OrderRequestState.ACCEPTED.value

        prod = ProductDetails.get(self,request, req.product_id).data

        print(prod)

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

        print(response.json())

        if(response.status_code == 201):
            id_purchase = response.text[1:len(response.text) - 1]
            product_detail = PurchaseItem.getId(id_purchase)
            master_entry = MasterProductIdData(id_supplier=prod['id_product'], id_customer=product_detail['id_prod'],id_purchase_item=id_purchase)
            master_entry.save()
        else:
            existing_master = MasterProductIdData.objects.get(id_supplier=prod['id_product'])
            id_purchase = existing_master.id_purchase_item
            product_detail = PurchaseItem.getId(id_purchase)


        today = datetime.now()

        dtoday = today.strftime("%Y-%m-%dT%H:%M:%S")
        serie = "2019"

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

        invoiceCustId = response1.text.replace('"', '')
        invoiceSupId = response2.text.replace('"', '')
        req.cust_invoice = invoiceCustId
        req.sup_invoice = invoiceSupId
        req.save()

        return HttpResponse("Accepted order request with ID: " + id_req, status=200)

class ProductList(APIView):
    #permission_classes = (IsAuthenticated,)

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
                'id': item['priceListLines'][0]['salesItemId'],
                'description': item['description']
            }
            dict.append(temp_dict)

        return Response(dict)

class PurchaseItem(APIView):
    #permission_classes = (IsAuthenticated,)

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
    #permission_classes = (IsAuthenticated,)

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


class InvoiceDetails(APIView):
    #permission_classes = (IsAuthenticated,)

    def get(self, request, id_req):
        global invoice_id
        req = OrderRequest.objects.get(id=id_req)
        invoice_id = req.sup_invoice

        response = requests.get(
            "https://" + JASMIN_URL + "/" + SUPP_TENANT + "/" + SUPP_ORG + "/billing/invoices/" + invoice_id,
            headers={
                'Authorization': SUPP_TOKEN,
                'Content-Type': 'application/json'
            })

        data = response.json()

        dict = {
            'grossValue': data['grossValue']['amount'],
            'discount': data['discount'],
            'taxTotal': data['taxTotal']['amount'],
            'totalValue': data['totalLiability']['amount'],
            'discountValue': data['discountInValueAmount']['amount'],
            'seller': data['companyDescription'],
            'deliveryMethod': data['deliveryTermDescription'],
            'paymentMethod': data['paymentMethodDescription'],
            'buyer': data['buyerCustomerPartyDescription'],
            'priceList': data['priceList'],
            'productDescription': data['documentLines'][0]['description']
        }


        return Response(dict)

class UserGroup(APIView):
    #permission_classes = (IsAuthenticated,)

    def get(self, request):
        response = {}
        response['group'] = request.user.groups.first().name
        return HttpResponse(json.dumps(response), content_type="application/json")

    def post(self,request):
        groupname = request.data['group']
        oldgroup = Group.objects.get(name=request.user.groups.first().name)
        newgroup = Group.objects.get(name=groupname)
        oldgroup.user_set.remove(request.user)
        newgroup.user_set.add(request.user)
        return HttpResponse("Changed user group to "+groupname, status=200)


class Auth(APIView):
    #permission_classes = (IsAuthenticated,)

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


class TotalIncome(APIView):
    def get(self, request):
        orderRequestList = Request.get(self,request)
        totalIncome = 0
        curentYear = date.today().year

        for request in orderRequestList.data:
            requestDate = datetime.fromtimestamp(request['time'])
            if (request['status'] == OrderRequestState.ACCEPTED.value) and (requestDate.year == curentYear):
                totalIncome += request['price']

        response = {}
        response['totalIncome'] = totalIncome
        return HttpResponse(json.dumps(response), content_type="application/json")


class TotalIncomeMonth(APIView):
    def get(self, request):
        orderRequestList = Request.get(self,request)
        totalIncome = 0
        curentYear = date.today().year
        currentMonth = date.today().month

        for request in orderRequestList.data:
            requestDate = datetime.fromtimestamp(request['time'])
            if (request['status'] == OrderRequestState.ACCEPTED.value) and (requestDate.year == curentYear) and (requestDate.month == currentMonth):
                totalIncome += request['price']

        response = {}
        response['totalIncomeMonth'] = totalIncome
        return HttpResponse(json.dumps(response), content_type="application/json")

class BestSelling(APIView):
    def get(self, request):
        orderRequestList = Request.get(self,request)
        productList = []

        for request in orderRequestList.data:
            productList.append(request['name'])

        counter = Counter(productList)

        response = {}
        response['bestSellingProduct'] = [k for k, v in counter.items() if v == max(counter.values())][0]
        return HttpResponse(json.dumps(response), content_type="application/json")

class ProductAmountProfit(APIView):
    def get(self, request):
        orderRequestList = Request.get(self,request)
        productList = []

        for request in orderRequestList.data:
            productList.append(request['name'])

        counter = Counter(productList)
        products = counter.keys()

        response = {}

        for productName in products:
            response[productName] = {}
            response[productName]['units'] = 0
            response[productName]['profit'] = 0
            for request in orderRequestList.data:
                if(request['name'] == productName):
                    response[productName]['units'] += 1
                    response[productName]['profit'] += request['price']

        return HttpResponse(json.dumps(response), content_type="application/json")

class MonthAmountProfit(APIView):
    def get(self, request):
        orderRequestList = Request.get(self,request)
        curentYear = date.today().year
        response = {}

        for i in range(1, 13):
            month = calendar.month_name[i]
            response[month] = {}
            response[month]['units'] = 0
            response[month]['profit'] = 0

            for request in orderRequestList.data:
                requestDate = datetime.fromtimestamp(request['time'])
                if(requestDate.year == curentYear) and (requestDate.month == i):
                    response[month]['units'] += 1
                    response[month]['profit'] += request['price']

        return HttpResponse(json.dumps(response), content_type="application/json")
