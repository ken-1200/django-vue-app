from api.views.stores import StoreViewSet, StoreLogin, LoginStoreUserGetView, StoreUserUpdateView, StoreRefreshToken
from api.views.items import ItemViewSet, ItemList, ItemDetail, AllItemViewSet
from api.views.users import UserViewSet, UserLogin, LoginUserGetView, UserUpdateView, UserRefreshToken
from api.views.payments import PaymentList, PaymentViewSet
from django.urls import path
from django.conf.urls import include, re_path
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from rest_framework.authtoken import views
from rest_framework import routers
from rest_framework import permissions

schema_view = get_schema_view(
  openapi.Info(
    title="Ecsite API",
    default_version='v1.0.0', # 必須APIドキュメントのバージョン情報
    description="Welcome to test Ecsite",# APIの詳細説明を記載
    terms_of_service="https://www.jaseci.org",# サービス利用規約
    contact=openapi.Contact(# 連絡先情報を定義
      email="jason@jaseci.org", 
      name="Customer Support"),
    license=openapi.License(name="Awesome IP"),# ライセンス名 urlも定義できる。イセンス名はSPDXを参考にするのがオススメ
  ),
  public=True,
  permission_classes=(permissions.AllowAny,),
)

# ViewSet
router = routers.DefaultRouter()
router.register('stores', StoreViewSet)
router.register('items', ItemViewSet)
router.register('users', UserViewSet)
router.register('payments', PaymentViewSet)
router.register('all', AllItemViewSet)

urlpatterns = [
  re_path('swagger(?P<format>\.json|\.yaml)$',
    schema_view.without_ui(cache_timeout=0), name='schema-json'),
  path('swagger/', 
    schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
  path('redoc/', 
    schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
  path('', include(router.urls)),
  path('payments_post/', PaymentList.as_view()),
  path('store_login/', StoreLogin.as_view()),
  path('user_login/', UserLogin.as_view()),
  path('get_store_user/', LoginStoreUserGetView.as_view()),
  path('get_user/', LoginUserGetView.as_view()),
  path('store_user_update/', StoreUserUpdateView.as_view()),
  path('user_update/', UserUpdateView.as_view()),
  path('item_list/', ItemList.as_view()),
  path('item_detail/<int:pk>/', ItemDetail.as_view()),
  path('refresh_token/', StoreRefreshToken.as_view()),
  path('user_refresh_token/', UserRefreshToken.as_view()),
]
