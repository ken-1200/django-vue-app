from django.contrib import admin
from item.models.items import Item
from payment.models.payments import Payment
from payment.models.roles import Role
from store.models.stores import Store
from user.models.users import User

# Register your models here.
admin.site.register(Store)
admin.site.register(Item)
admin.site.register(User)
admin.site.register(Payment)
admin.site.register(Role)