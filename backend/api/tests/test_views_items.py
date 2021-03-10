from api.tests.test_setup import Tests
from rest_framework.test import APITestCase
from rest_framework.test import APIClient
from rest_framework import status

class ItemListTest(APITestCase):
  """
  アイテム GET(ALL), POST「テスト」
  """
  def test_perform_create_post(self):
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
    self.assertEqual(response.status_code, status.HTTP_201_CREATED)

  def test_perform_create_get(self):
    Tests.setUpTestData()

    request_data = {
      "store_email": "user@example.com",
      "store_password": "string"
    }

    response = self.client.post('/api/store_login/', request_data, format='json')

    self.client.credentials(HTTP_AUTHORIZATION="1234567" + response.data['data']['access_token'])

    response = self.client.get('/api/item_list/', format='json')
    self.assertEqual(response.status_code, status.HTTP_200_OK)

class ItemDetailTest(APITestCase):
  """
  アイテム PATCH(item_idに紐づく商品を更新する)「テスト」
  """
  def test_patch(self):
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

    response = self.client.patch('/api/item_detail/' + str(id) + '/', format='json')
    self.assertEqual(response.status_code, status.HTTP_200_OK)

class ItemViewSetTest(APITestCase):
  """
  アイテム GET(ストアオーナーに紐づいた除された商品以外一覧)「テスト」
  """
  def test_get_item_detail(self):
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

    response = self.client.get('/api/items/get_item_detail/', format='json')
    self.assertEqual(response.status_code, status.HTTP_200_OK)

class AllItemViewSetTest(APITestCase):
  """
  アイテム GET(削除された商品以外一覧)、DELETE(完全削除はせずに初期値を入れる)「テスト」
  """
  def test_items_list(self):
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

    response = self.client.get('/api/all/items_list/', format='json')
    self.assertEqual(response.status_code, status.HTTP_200_OK)

  def test_delete_item(self):
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

    response = self.client.delete('/api/all/' + str(id) + '/delete_item/', format='json')
    self.assertEqual(response.status_code, status.HTTP_200_OK)
