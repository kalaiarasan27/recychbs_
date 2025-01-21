from django.urls import path
from .views import *
from django.contrib.auth import views as auth_views

urlpatterns = [
    path('register-form/', register_view, name='register_form'),
    path('login-form/', login_view, name='login_form'),
    path('otp/', otp_send, name='otp_send'),
    path('resend-otp/', resend_otp_view, name='resend-otp'),

    # dealer site 
    path('dealer_details/', dealer_details, name='dealer_details'),
    path('fetchDealerEditDetails/', fetchDealerEditDetails, name='fetchDealerEditDetails'),
    path('updateDealerDetails/', updateDealerDetails, name='updateDealerDetails'),

    path('fetch/', GetScrap, name='GetScrap'),
    path('InsertScrap/', InsertScrap, name='InsertScrap'),
    path('UpdateScrap/', UpdateScrap, name='UpdateScrap'),
    path('StatusActive/', approve_dealer, name='approve_dealer'),
    path('FetchStatusActive/', fetch_approve_dealer, name='fetch_approve_dealer'),
    path('send_extraData/', send_extraData, name='send_extraData'),
    # path("image_validate/",image_validate,name="image_validate"),

    path('delete-Scrap/', delete_Scrap, name='delete_bike'),
    path('Get-Scrap-Type/', Get_Scrap_Type, name='Get-Scrap-Type'),
    path('User_Scrap_Type/', User_Scrap_Type, name='Get-Scrap-Type'),
    path('USer_delete_Scrap/', USer_delete_Scrap, name='Get-Scrap-Type'),
    path('UserInsertScrap/', UserInsertScrap, name='Get-Scrap-Type'),
    path('UserUpdateScrap/', UserUpdateScrap, name='Get-Scrap-Type'),

    # User Urls

    path('SelectScrap/', SelectScrap, name='SelectScrap'),
    path('ScrapSelection/', ScrapSelection, name='ScrapSelection'),
    path('bookdealer/',Bookdealer,name='bookdealer'),
    path('email/',email,name='email'),
    path('api/files/', get_uploaded_files, name='get_uploaded_files'),

#     Forget Password
    path('generate_otp/', generate_otp_view, name='generate_otp'),
    path('verify_otp/', verify_otp_view, name='verify_otp'),

    # path('password_reset/',auth_views.PasswordResetView.as_view(),name='password_reset'),
 
    # path('password_reset/done/',auth_views.PasswordResetDoneView.as_view(),name='password_reset_done'),
 
    # path('reset/<uidb64>/<token>/',auth_views.PasswordResetConfirmView.as_view(),name='password_reset_confirm'),
 
    # path('reset/done/', CustomPasswordResetCompleteView.as_view(), name='password_reset_complete'),


     path('password-reset/', PasswordResetRequestView.as_view(), name='password_reset'),
    path('reset/<uidb64>/<token>/', PasswordResetConfirmView.as_view(), name='password_reset_confirm'),
    # path('password-reset/', auth_views.PasswordResetView.as_view(), name='password_reset'),
    # path('password-reset/done/', auth_views.PasswordResetDoneView.as_view(), name='password_reset_done'),
    # path('reset/<uidb64>/<token>/', auth_views.PasswordResetConfirmView.as_view(), name='password_reset_confirm'),
    # path('reset/done/', auth_views.PasswordResetCompleteView.as_view(), name='password_reset_complete'),
    # user URLS

    path('GetUserDetails/', GetUserDetails, name='GetUserDetails'),

    path('upload/', upload_file, name='upload_photo'),

    # Admin URLS
    path('send_notification/',send_notification,name='send_notification'),
    path('fetchDealerDetails/', Get_DealerDetails, name='Get_DealerDetails'),
    path('fetchUserProfile/', Get_UserProfile, name='Get_UserProfile'),
    path('send_message/',send_message,name='send_message'),
    # path('Get_UserNotification/',Get_UserNotification,name='Get_UserNotification'),
    path('Get_UserNotification/', Get_UserNotification, name='Get_UserNotification'),
    path('Get_Usersetting/', Get_Usersetting, name='Get_Usersetting'),
    path('your-endpoint/', handle_checkbox, name='handle_checkbox'),
    path('your-Get_Email/', Get_Email, name='Get_Email'),
    path('update-bank-account/', save_bank_details, name='update-bank-account'),
    path('upload-file/',upload_file , name='upload-file'),
    path('get-file/', get_file, name='get-file'),
    path('list/', list_files, name='list'),
    path('display/<filename>', display_file, name='/display'),

    path('sms-send/', send_otp, name='Sms-send'),
    path('file-details/', display_file_details, name='file-details'),
    path('images/', get_images, name='get_images'),
    path('file', fetch_image_from_s3, name='fetch-image-from-s3'),
    path('fetch-file', fetch_files, name='fetch-file'),

    #session test

    path('set_session/', set_session, name='set_session'),
    path('get_session/', get_session, name='get_session'),
    path('clear_session/',clear_session, name='clear_session'),

]
