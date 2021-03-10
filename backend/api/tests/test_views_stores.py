from api.tests.test_setup import Tests
from rest_framework.test import APITestCase
from rest_framework.test import APIClient
from rest_framework import status

class StoreViewSetTest(APITestCase):
  """
  ショップオーナー（ストア側）の登録、削除「テスト」
  """
  def test_create_store(self):
    request_data = {
      "store_name": "string",
      "store_email": "user@example.com",
      "store_password": "string"
    }

    response = self.client.post('/api/stores/create_store/', request_data)
    self.assertEqual(response.status_code, status.HTTP_201_CREATED)

  def test_delete_store(self):
    Tests.setUpTestData()

    request_data = {
      "store_email": "user@example.com",
      "store_password": "string"
    }

    response = self.client.post('/api/store_login/', request_data, format='json')

    id = response.data['data']['store_id']

    response = self.client.delete('/api/stores/' + str(id) + '/delete_store/', format='json')
    self.assertEqual(response.status_code, status.HTTP_200_OK)

class StoreLoginTest(APITestCase):
  """
  ショップオーナー（ストア側）のログイン「テスト」
  """
  def test_post(self):
    Tests.setUpTestData()

    request_data = {
      "store_email": "user@example.com",
      "store_password": "string"
    }

    response = self.client.post('/api/store_login/', request_data, format='json')
    self.assertEqual(response.status_code, status.HTTP_200_OK)

class StoreRefreshTokenTest(APITestCase):
  """
  ショップオーナー（ストア側）のログイン状態「リフレッシュトークン」「テスト」
  """
  def test_post(self):
    Tests.setUpTestData()

    request_data = {
      "store_email": "user@example.com",
      "store_password": "string"
    }

    response = self.client.post('/api/store_login/', request_data, format='json')

    request_data = {
      "refresh_key": response.data['data']['refresh_token']
    }

    response_data = self.client.post('/api/refresh_token/', request_data, format='json')
    self.assertEqual(response.status_code, status.HTTP_200_OK)

class StoreUserUpdateViewTest(APITestCase):
  """
  ログインしている状態で自分自身の情報をupdateする「テスト」
  """
  def test_get_object(self):
    Tests.setUpTestData()

    request_data = {
      "store_email": "user@example.com",
      "store_password": "string"
    }

    response = self.client.post('/api/store_login/', request_data, format='json')

    request_data = {
      "store_name": "string",
      "store_email": "user@example.com",
      "store_password": "stringstring"
    }

    self.client.credentials(HTTP_AUTHORIZATION="1234567" + response.data['data']['access_token'])

    response = self.client.put('/api/store_user_update/', request_data, format='json')
    self.assertEqual(response.status_code, status.HTTP_200_OK)

class LoginStoreUserGetViewTest(APITestCase):
  """
  ログインしている状態で自分自身の情報を取得する
  """
  def test_get(self):
    Tests.setUpTestData()

    request_data = {
      "store_email": "user@example.com",
      "store_password": "string"
    }

    response = self.client.post('/api/store_login/', request_data, format='json')

    self.client.credentials(HTTP_AUTHORIZATION="1234567" + response.data['data']['access_token'])

    response = self.client.get('/api/get_store_user/', format='json')
    self.assertEqual(response.status_code, status.HTTP_200_OK)
