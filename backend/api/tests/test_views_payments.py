from api.tests.test_setup import Tests
from rest_framework.test import APITestCase
from rest_framework.test import APIClient
from rest_framework import status
import json

class PaymentListTest(APITestCase):
  """
  商品購入API「テスト」
  """
  def test_post(self):
    Tests.setUpTestData()

    request_data = {
      "store_email": "user@example.com",
      "store_password": "string"
    }

    response = self.client.post('/api/store_login/', request_data, format='json')

    self.client.credentials(HTTP_AUTHORIZATION="1234567" + response.data['data']['access_token'])

    request_data = {
      "item_name": "string",
      "item_detail": "string",
      "item_price": 1000,
      "item_total": 20
    }

    response = self.client.post('/api/item_list/', request_data, format='json')

    id = response.data['id']

    request_data = {
      "role": [
        {
          "item_id": str(id),
          "item_quantity": 1
        }
      ],
      "pay_totalprice": 1,
      "user_email": "user@example.com"
    }
    response = self.client.post('/api/payments_post/', request_data, format='json')
    self.assertEqual(response.status_code, status.HTTP_201_CREATED)

class PaymentViewSetTest(APITestCase):
  """
  GET 購入情報取得「テスト」
  """
  def test_get_payment_info(self):
    Tests.setUpTestData()

    request_data = {
      "user_email": "user@example.com",
      "password": "string"
    }

    response = self.client.post('/api/user_login/', request_data, format='json')

    self.client.credentials(HTTP_AUTHORIZATION="1234567" + response.data['data']['access_token'])

    response = self.client.get('/api/payments/get_payment_info/', format='json')
    self.assertEqual(response.status_code, status.HTTP_200_OK)

  def test_get_payments(self):
    Tests.setUpTestData()

    request_data = {
      "store_email": "user@example.com",
      "store_password": "string"
    }

    response = self.client.post('/api/store_login/', request_data, format='json')

    self.client.credentials(HTTP_AUTHORIZATION="1234567" + response.data['data']['access_token'])

    request_data = {
      "item_name": "string",
      "item_detail": "string",
      "item_price": 1000,
      "item_total": 20
    }

    response = self.client.post('/api/item_list/', request_data, format='json')

    id = response.data['id']

    request_data = {
      "role": [
        {
          "item_id": str(id),
          "item_quantity": 1
        }
      ],
      "pay_totalprice": 1,
      "user_email": "user@example.com"
    }
    response = self.client.post('/api/payments_post/', request_data, format='json')

    request_data = {
      "user_email": "user@example.com",
      "password": "string"
    }

    response = self.client.post('/api/user_login/', request_data, format='json')

    self.client.credentials(HTTP_AUTHORIZATION="1234567" + response.data['data']['access_token'])

    response = self.client.get('/api/payments/get_payment_info/', format='json')

    data = json.loads(response.content)

    id = data[0]['pk']

    response = self.client.get('/api/payments/' + str(id) + '/get_payments/', format='json')
    self.assertEqual(response.status_code, status.HTTP_200_OK)

