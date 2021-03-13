from customtoken.models.customtoken import CustomToken
from rest_framework import serializers

class StoreRefreshTokenSerializer(serializers.ModelSerializer):
  class Meta:
    model = CustomToken
    fields = ['refresh_key']
