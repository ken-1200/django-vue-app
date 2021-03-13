from drf_extra_fields.fields import Base64ImageField
from item.models.items import Item
from rest_framework import serializers

class ItemSerializer(serializers.ModelSerializer):
  # Storeモデルのストアidをとってくる
  store_owner = serializers.ReadOnlyField(source='store_owner.group_ptr_id')

  # 画像をBase64で受け取る(decodeする)
  item_img = Base64ImageField(max_length=None, use_url=True, required=False)
  class Meta:
    model = Item
    fields = ['id', 'item_name', 'item_img', 'item_detail', 'item_price', 'item_total', 'store_owner']
