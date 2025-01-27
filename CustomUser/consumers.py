 
# # consumers.py
# import json
# from channels.generic.websocket import AsyncWebsocketConsumer

# import logging
# logger = logging.getLogger(__name__)

# class DealerConsumer(AsyncWebsocketConsumer):
#     async def connect(self):
#         print("--WebSocket connection established")
#         await self.channel_layer.group_add("dealer_group", self.channel_name)
#         await self.accept()

#     async def disconnect(self, close_code):
#         print("--WebSocket disconnected")
#         await self.channel_layer.group_discard("dealer_group", self.channel_name)

#     async def order_created(self, event):
#         order = event['order']
#         print(f"Sending order: {order}")
#         await self.send(text_data=json.dumps({
#             'order': order
#         }))



from channels.generic.websocket import AsyncWebsocketConsumer
import json

class DealerConsumer(AsyncWebsocketConsumer):

    async def connect(self):
        # print("--WebSocket connection established")
        print("1")

        # Get dealer_id from the URL route
        self.dealer_id = self.scope['url_route']['kwargs']['dealer_id']
        self.group_name = f'dealer_{self.dealer_id}'
        # print(self.dealer_id)
        # print("Notification Group",self.group_name)
        # Join dealer-specific group
        await self.channel_layer.group_add(
            self.group_name,
            self.channel_name
        )
        await self.accept()

    async def disconnect(self, close_code):
        # print("--WebSocket disconnected")
        print("2")

        # Leave the dealer's group
        await self.channel_layer.group_discard(
            self.group_name,
            self.channel_name
        )

    # Custom method to receive order notifications
    async def order_created(self, event):

        message = event['order']
        print("Sending message to client:", message)  # Add logging
        await self.send(text_data=json.dumps({
            'order': message
        }))
        print("Notification 3")
        # print("Notification Sent")
