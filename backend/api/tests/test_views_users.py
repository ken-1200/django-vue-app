from api.tests.test_setup import Tests
from rest_framework.test import APITestCase
from rest_framework.test import APIClient
from rest_framework import status

class UserViewSetTest(APITestCase):
  """
  ユーザー（購入者）の登録、削除「テスト」
  """
  def test_create_user(self):
    request_data = {
      "user_name": "string",
      "user_email": "user@example.com",
      "password": "string"
    }
    response = self.client.post('/api/users/create_user/', request_data)
    self.assertEqual(response.status_code, status.HTTP_201_CREATED)

  def test_delete_user(self):
    Tests.setUpTestData()

    request_data = {
      "user_email": "user@example.com",
      "password": "string"
    }

    response = self.client.post('/api/user_login/', request_data, format='json')

    id = response.data['data']['user_id']

    response = self.client.delete('/api/users/' + str(id) + '/delete_user/', format='json')
    self.assertEqual(response.status_code, status.HTTP_200_OK)

class UserLoginTest(APITestCase):
  """
  ユーザー（購入者）のログイン「テスト」
  """
  def test_post(self):
    Tests.setUpTestData()

    request_data = {
      "user_email": "user@example.com",
      "password": "string"
    }
    response = self.client.post('/api/user_login/', request_data, format='json')
    self.assertEqual(response.status_code, status.HTTP_200_OK)

class UserRefreshTokenTest(APITestCase):
  """
  ユーザー（購入者）のログイン状態「リフレッシュトークン」「テスト」
  """
  def test_post(self):
    Tests.setUpTestData()

    request_data = {
      "user_email": "user@example.com",
      "password": "string"
    }

    response = self.client.post('/api/user_login/', request_data, format='json')

    request_data = {
      "key": response.data['data']['refresh_token']
    }

    response_data = self.client.post('/api/user_refresh_token/', request_data, format='json')
    self.assertEqual(response.status_code, status.HTTP_200_OK)

class LoginUserGetViewTest(APITestCase):
  """
  ログインしている状態で自分自身の情報を取得する
  """
  def test_get(self):
    Tests.setUpTestData()

    request_data = {
      "user_email": "user@example.com",
      "password": "string"
    }

    response = self.client.post('/api/user_login/', request_data, format='json')

    self.client.credentials(HTTP_AUTHORIZATION="1234567" + response.data['data']['access_token'])

    response = self.client.get('/api/get_user/', format='json')
    self.assertEqual(response.status_code, status.HTTP_200_OK)

class UserUpdateViewTest(APITestCase):
  """
  ログインしている状態で自分自身の情報をupdateする
  """
  def test_get_object(self):
    Tests.setUpTestData()

    request_data = {
      "user_email": "user@example.com",
      "password": "string"
    }

    response = self.client.post('/api/user_login/', request_data, format='json')

    request_data = {
      "user_name": "string",
      "user_email": "user@example.com",
      "password": "stringstring"
    }
    self.client.credentials(HTTP_AUTHORIZATION="1234567" + response.data['data']['access_token'])

    response = self.client.put('/api/user_update/', request_data, format='json')
    self.assertEqual(response.status_code, status.HTTP_200_OK)
