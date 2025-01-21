
# Register your models here.
from django.contrib import admin
from .models import *


# class CustomerAdmin(admin.ModelAdmin):
#     list_display = ('username', 'email','Address', 'first_name', 'last_name', 'is_active')
#     search_fields = ('username', 'email')

# admin.site.register(Customer, CustomerAdmin)

# class DealerAdmin(admin.ModelAdmin):
#     list_display = ('username', 'email', 'first_name', 'last_name', 'is_active')
#     search_fields = ('username', 'email')

# admin.site.register(Dealer_Table, DealerAdmin)