# # routing.py
# from django.urls import path
# from HBS_Project import consumers

# websocket_urlpatterns = [
#     path('ws/orders/', consumers.DealerConsumer.as_asgi()),
# ]


from django.urls import re_path
from . import consumers

websocket_urlpatterns = [
    re_path(r'ws/dealer/(?P<dealer_id>\w+)/$', consumers.DealerConsumer.as_asgi()),
]
