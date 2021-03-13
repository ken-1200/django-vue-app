from payment.models.roles import Role
from rest_framework import serializers

# RoleSerializer
class RoleSerializer(serializers.ModelSerializer):
  class Meta:
    model = Role
    fields = ['id', 'item_id', 'item_quantity']
