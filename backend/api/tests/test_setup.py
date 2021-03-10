from django.test import TestCase
from user.models.users import User
from store.models.stores import Store

class Tests(TestCase):
  """
  ユーザー（購入者）、ショップオーナー（ストア側）の登録「テストセットアップ用」
  """
  @classmethod
  def setUpTestData(cls):
    request_data = {
      "user_name": "string",
      "user_email": "user@example.com",
      "password": "string"
    }
    User.objects.create_user(request_data)

    request_data = {
      "store_name": "string",
      "store_email": "user@example.com",
      "store_password": "string"
    }
    Store.objects.create_user(request_data)