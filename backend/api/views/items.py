from api.serializers.item import ItemSerializer
from api.permission import CustomItemPermission
from api.authentication import CustomAuthentication
from django.utils import timezone
from django.core import serializers
from django.http import HttpResponse, Http404
from django.shortcuts import render
from item.models.items import Item
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.exceptions import APIException
from rest_framework import permissions, generics
from store.models.stores import Store

# APIException
class NotFound(APIException):
  status_code = 404
  default_detail = "見つかりませんでした。"
  default_code = "HTTP_404_NOT_FOUND"

# 商品一覧
# モデルインスタンスのコレクションを表すための読み取り/書き込みエンドポイントに使用される get/post
class ItemList(generics.ListCreateAPIView):
  """
  アイテム GET(ALL), POST
  """
  queryset = Item.objects.all()
  serializer_class = ItemSerializer
  authentication_classes = [CustomAuthentication,]
  # 認証されたユーザのリクエストは読み書きが可能になり、認証されていないリクエストは読み取りのみ可能
  permission_classes = [CustomItemPermission,]

  # 新しいオブジェクトインスタンスを保存するときに呼び出される
  def perform_create(self, serializer):
    print('認証されたユーザーで商品を作成します。')
    serializer.save(store_owner=self.request.user)

# 商品詳細クラス
# 単一のモデルインスタンスを表すための読み取り-書き込み-削除エンドポイントに使用
class ItemDetail(generics.RetrieveUpdateDestroyAPIView):
  """
  アイテム GET(pk指定), PUT, PATCH(item_idに紐づく商品を更新する), DELETE(レコード削除)
  """
  # 編集や削除は作成者のみが行える
  queryset = Item.objects.all()
  serializer_class = ItemSerializer
  authentication_classes = [CustomAuthentication,]
  permission_classes = [CustomItemPermission, ]

  # 編集メソッド
  def patch(self, request, *args, **kwargs):
    print('認証されたユーザーで商品を編集します。')
    return self.partial_update(request, *args, **kwargs)

# ItemViewSetの作成
class ItemViewSet(viewsets.ModelViewSet):
  """
  アイテム GET(ストアオーナーに紐づいた除された商品以外一覧), アイテム GET(削除された商品以外全ての一覧), DELETEなし
  """
  # パーミッション設定
  # authentication_classesで使用する認証クラスを指定
  # permission_classesにはこのAPIを使用するための権限を設定
  # IsAuthenticatedはauthentication_classesで設定した認証が行えた場合にこのAPIにアクセス可能
  queryset = Item.objects.all()
  serializer_class = ItemSerializer
  authentication_classes = [CustomAuthentication,]
  permission_classes = [CustomItemPermission,]

# ストアオーナーに紐づいたアイテムを取得する
  @action(detail=False, methods=['get'])
  def get_item_detail(self, request):
    try:
      # オーナーの商品をJsonにシリアル化/削除された商品以外を取得
      items = Item.objects.filter(store_owner=request.user.id, deleted_at=None)
      item_list = serializers.serialize('json', items)
    except Exception as err:
      # システム終了以外の全ての組み込み例外
      print(err)
      raise NotFound({
        'NOT_FOUND': [
          NotFound().status_code,
          NotFound().default_detail,
        ]
      })
    return HttpResponse(content=item_list, content_type="application/json", status=200)

# 商品一覧 ユーザーストア共に見れる商品一覧
class AllItemViewSet(viewsets.ModelViewSet):
  """
  アイテム GET(削除された商品以外一覧)
  """
  queryset = Item.objects.all()
  serializer_class = ItemSerializer

# 存在する商品(削除されたもの以外全て)List取得
  @action(detail=False, methods=['get'])
  def items_list(self, request):
    try:
      # オーナー順に昇順に並び替え
      item = Item.objects.order_by('-store_owner').reverse().filter(deleted_at=None)
      item_list = serializers.serialize('json', item)
    except Exception as err:
      # システム終了以外の全ての組み込み例外
      print(err)
      raise NotFound({
        'NOT_FOUND': [
          NotFound().status_code,
          NotFound().default_detail,
        ]
      })
    return HttpResponse(content=item_list, content_type="application/json", status=200)

# 完全削除はせずに各値に初期値を入れて、削除
  @action(detail=True, methods=['delete'])
  def delete_item(self, request, pk=None):
    # itemボタン押下時に、削除日時に押下時の時間を入れる。
    try:
      item_obj = self.queryset.get(pk=pk)
      item_obj.item_name = ''
      item_obj.item_img = ''
      item_obj.item_detail = ''
      item_obj.item_price = 0
      item_obj.item_total = 0
      item_obj.deleted_at = timezone.now()
      item_obj.save()
      content = {
        'item_name': item_obj.item_name,
        'item_img': '{item_obj.item_img}'.format(item_obj=item_obj),
        'item_detail': item_obj.item_detail,
        'item_price': item_obj.item_price,
        'item_total': item_obj.item_total,
        'deleted_at': item_obj.deleted_at
      }
    except Exception as err:
      # システム終了以外の全ての組み込み例外
      print(err)
      raise NotFound({
        'NOT_FOUND': [
          NotFound().status_code,
          NotFound().default_detail,
        ]
      })
    return Response({'message': 'Success', 'data': content, 'status': 204})
