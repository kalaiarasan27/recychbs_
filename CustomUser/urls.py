from django.urls import path
from .views import *
from django.contrib.auth import views as auth_views


urlpatterns = [
    path('register-form/', register_view, name='register_form'),
    path('login-form/', login_view, name='login_form'),
    path('otp/', register_confirmation, name='otp_send'),
    path('resend-otp/', resend_otp_view, name='resend-otp'),

    # dealer site 
    path('dealer_details/', dealer_details, name='dealer_details'),
    path('fetchDealerEditDetails/', fetchDealerEditDetails, name='fetchDealerEditDetails'),
    path('updateDealerDetails/', updateDealerDetails, name='updateDealerDetails'),


    path('fetch/', GetScrap, name='GetScrap'),
    path('UpdateScrap/', UpdateScrap, name='UpdateScrap'),
    path('StatusActive/', approve_dealer, name='approve_dealer'),
    path('FetchStatusActive/', fetch_approve_dealer, name='fetch_approve_dealer'),
    path('send_extraData/', send_extraData, name='send_extraData'),
    # path("image_validate/",image_validate,name="image_validate"),


    # User Urls
    path('GetUserDetails/', GetUserDetails, name='GetUserDetails'),
    path('SelectScrap/', SelectScrap, name='SelectScrap'),
    path('ScrapSelection/', ScrapSelection, name='ScrapSelection'),
    path('bookdealer/',Bookdealer,name='bookdealer'),
    path('ongoing_order/',user_OngoingOrder,name='ongoing_order'),
    path('Get_UserNotification/', Get_UserNotification, name='Get_UserNotification'),
    path('update-bank-account/', save_bank_details, name='update-bank-account'),





    # Forget Password

     path('password-reset/', PasswordResetRequestView.as_view(), name='password_reset'),
    path('reset/<uidb64>/<token>/', PasswordResetConfirmView.as_view(), name='password_reset_confirm'),


    # Admin URLS

    path('fetchDealerDetails/', Get_DealerDetails, name='Get_DealerDetails'),
    path('fetchUserProfile/', Get_UserProfile, name='Get_UserProfile'),
    path('send_message/',send_message,name='send_message'),
    path('send_notification/',send_notification,name='send_notification'),
    path('get_dealers_status/',get_dealers_status,name='get_dealers_status'),
    path('update_dealer_status/',update_dealer_status,name='update_dealer_status'),

    path('InsertScrap/', InsertScrap, name='InsertScrap'),
    path('delete-Scrap/', delete_Scrap, name='delete_bike'),
    path('Get-Scrap-Type/', Get_Scrap_Type, name='Get-Scrap-Type'),


    path('Get_Usersetting/', Get_Usersetting, name='Get_Usersetting'),
    path('handle_checkbox/', handle_checkbox, name='handle_checkbox'),





    path('update-location/', update_user_location, name='update_location'),
    path('nearbyUsers/', nearbyUsers, name='nearbyUsers'),


    path('upload-file/',upload_file , name='upload-file'),
    path('get-file/', get_file, name='get-file'),
]
