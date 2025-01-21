"""
Django settings for HBS_Project project.

Generated by 'django-admin startproject' using Django 5.0.6.

For more information on this file, see
https://docs.djangoproject.com/en/5.0/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/5.0/ref/settings/
"""

from pathlib import Path
import os
import dj_database_url
import django_heroku

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/5.0/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-f247#btkri*v8$@^pbnr7mf@&#llh59-*$x7b5p^-$d4&gwsjp'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = False

ALLOWED_HOSTS = ['http://localhost:5174',    'http://localhost:5173',
]


# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'whitenoise.runserver_nostatic',  # WhiteNoise for static files during development
    'django.contrib.staticfiles',
    'CustomUser',
    'corsheaders',
    'storages',

]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',  # Should come before AuthenticationMiddleware
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',  # Correctly placed
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'corsheaders.middleware.CorsMiddleware',
]

REST_FRAMEWORK = {
    'DEFAULT_RENDERER_CLASSES': [
        'rest_framework.renderers.JSONRenderer',
    ],
}

SESSION_ENGINE = 'django.contrib.sessions.backends.db'

ROOT_URLCONF = 'HBS_Project.urls'

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/5.0/howto/static-files/

STATIC_URL = 'assets/'

STATIC_ROOT = os.path.join(BASE_DIR,'staticfiles')
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


STATICFILES_DIRS = [
    os.path.join(BASE_DIR, 'dist','assets'),
]



TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, 'dist')],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'HBS_Project.wsgi.application'


# Database
# https://docs.djangoproject.com/en/5.0/ref/settings/#databases

# DATABASES = {
#     'default': dj_database_url.parse(os.environ.get('mysql://vp74v4k1viap1uyd:t2ubeigrwyu0jqyg@qbhol6k6vexd5qjs.cbetxkdyhwsb.us-east-1.rds.amazonaws.com:3306/bong599rpr85d37q'), conn_max_age=600)
# }
# DATABASES = {
#     'default': {
#         'ENGINE': 'django.db.backends.mysql',
#         'NAME': 'bong599rpr85d37q',
#         'HOST':'qbhol6k6vexd5qjs.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
#         'USER':'vp74v4k1viap1uyd',
#         'PASSWORD':'t2ubeigrwyu0jqyg',
#         'PORT':'3306',

#     }
# }
# mysql://duffxo0thwkv74na:zjsctuq1ij8hvl41@qbhol6k6vexd5qjs.cbetxkdyhwsb.us-east-1.rds.amazonaws.com:3306/di3iomsakqwry3y2
# DATABASES = {
#     'default': {
#         # 'ENGINE': 'mysql.connector.django',
#         'ENGINE': 'django.db.backends.mysql',
#         'NAME': 'di3iomsakqwry3y2',
#         'HOST':'qbhol6k6vexd5qjs.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
#         'USER':'duffxo0thwkv74na',
#         'PASSWORD':'zjsctuq1ij8hvl41',
#         'PORT':'3306',
#         'CONN_MAX_AGE': 60,  # Close connection after 60 seconds of idle time
#         # 'OPTIONS': {
#         #     'pool_name': 'my_connection_pool',
#         #     'pool_size': 5,  # Set this lower to avoid hitting the max limit
#         # }
#         'MAX_CONNS': 5,        # Limit the max number of connections (optional)

#     }
# }
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'hudsmer',
        'HOST':'82.112.238.156',
        'USER':'hudsmer_user',
        'PASSWORD':'Hudsmer@123',
        'PORT':'3306',
       
    }
}

# DATABASES = {
#     'default': {
#         'ENGINE': 'django.db.backends.mysql',
#         'NAME': 'revenge',
#         'HOST':'localhost',
#         'USER':'root',
#         'PASSWORD':'Santhosh112',
#         'PORT':'3306',
       
#     }
# }

AUTH_USER_MODEL = 'CustomUser.User'

HOSTINGER_S3 = {
    'BUCKET_NAME': 'mybucket',
    'ENDPOINT_URL': 'http://82.112.238.156:9000',
    'ACCESS_KEY':'minioadmin',
    'SECRET_KEY':'minioadmin',  # Example: https://your-region.hostinger.com
}

# settings.py
AWS_ACCESS_KEY_ID = 'minioadmin'
AWS_SECRET_ACCESS_KEY = 'minioadmin'
AWS_STORAGE_BUCKET_NAME = 'mybucket'
AWS_S3_ENDPOINT_URL = 'http://82.112.238.156:9000'
AWS_REGION = 'us-east-1'  # Replace with the actual region, e.g., 'us-east-1'




# Custom User
# AUTHENTICATION_BACKENDS = [
#     'HBS_Project.backends.UsernamePhoneBackend',  # Custom backend for username, phone, and password
#     'django.contrib.auth.backends.ModelBackend',  # Default backend
# ]
AUTH_USER_MODEL = 'CustomUser.User'


MEDIA_ROOT = '/media/'

# MEDIA_ROOT = os.path.join(BASE_DIR,'media')

# Password validation
# https://docs.djangoproject.com/en/5.0/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/5.0/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True



# Default primary key field type
# https://docs.djangoproject.com/en/5.0/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'


CORS_ALLOWED_ORIGINS = [
    'http://localhost:5173',  # React app's URL
    'http://localhost:5174',
    'https://django-djreact-app-d5af3d4e3559.herokuapp.com',  # React app's URL
    'https://adminapp-46edb27550db.herokuapp.com',  # React app's URL
    'https://hsb-admin-ui.onrender.com',
    'https://hsb-ui.onrender.com',
    'https://hbs-admin-afcea2f2324b.herokuapp.com',
    'https://new-hbs-admin-82beda5bc10a.herokuapp.com',
    'chrome-extension://eejfoncpjfgmeleakejdcanedmefagga',

    # 'https://demo-djreact-recyc-app-ee540343796a.herokuapp.com'

]

CORS_ORGIN_ALLOW_ALL = True
CORS_ALLOW_CREDENTIALS = True  # Allow credentials like cookies to be included

CSRF_TRUSTED_ORIGINS = [
    'http://localhost:5173',  # React app's URL
    'http://localhost:5174',
    'https://django-djreact-app-d5af3d4e3559.herokuapp.com',  # React app's URL
    'https://adminapp-46edb27550db.herokuapp.com',  # React app's URL
    'https://hsb-admin-ui.onrender.com',
    'https://hsb-ui.onrender.com',
    'https://hbs-admin-afcea2f2324b.herokuapp.com',
    'https://new-hbs-admin-82beda5bc10a.herokuapp.com',
    # 'https://demo-djreact-recyc-app-ee540343796a.herokuapp.com'

]


SESSION_ENGINE = 'django.contrib.sessions.backends.db'  # Default: use database for session storage

# Important for allowing cross-origin cookies to be shared:
SESSION_COOKIE_SAMESITE = None  # Allow the session cookie to be shared across different origins
SESSION_COOKIE_SECURE = False  # Set to True in production when using HTTPS


django_heroku.settings(locals())






from django.conf import settings

# AWS Credentials
# AWS_ACCESS_KEY_ID = os.environ.get('AKIAVFIWJC7UXNYEXGOB')
# AWS_SECRET_ACCESS_KEY = os.environ.get('2EYRpZPaKjtyJYH+axvlkEDUl6XG0RsO5S48RnZ7')
# AWS_STORAGE_BUCKET_NAME = '<django-djreact-app-media-bucket>'
# AWS_S3_REGION_NAME = 'eu-north-1'  # Example: 'us-west-1'
# AWS_S3_SIGNATURE_VERSION = 's3v4'
# AWS_S3_FILE_OVERWRITE = False
# AWS_DEFAULT_ACL = None

# # # Static and Media Files
# AWS_S3_CUSTOM_DOMAIN = f'{AWS_STORAGE_BUCKET_NAME}.s3.amazonaws.com'
# DEFAULT_FILE_STORAGE = 'storages.backends.s3boto3.S3Boto3Storage'

# # # URLs for static and media files
# MEDIA_URL = f'https://{AWS_S3_CUSTOM_DOMAIN}/media/'

# # Security and Encryption
# AWS_S3_OBJECT_PARAMETERS = {
#     'ServerSideEncryption': 'AES256',  # Optional: Use 'aws:kms' if you're using KMS encryption
# }

# from decouple import config

# AWS_ACCESS_KEY_ID = config('AWS_ACCESS_KEY_ID')
# AWS_SECRET_ACCESS_KEY = config('AWS_SECRET_ACCESS_KEY')
# AWS_STORAGE_BUCKET_NAME = config('AWS_STORAGE_BUCKET_NAME')
# AWS_S3_CUSTOM_DOMAIN = f'{AWS_STORAGE_BUCKET_NAME}.s3.amazonaws.com'
# AWS_S3_REGION_NAME = config('AWS_S3_REGION_NAME')  # e.g. 'us-west-2'

# AWS_DEFAULT_ACL = None  # Or 'public-read' if needed
# AWS_S3_FILE_OVERWRITE = True
# AWS_S3_VERITY = True



# Static files (CSS, JavaScript, etc.)
# STATICFILES_STORAGE = 'storages.backends.s3boto3.S3Boto3Storage'
# STATIC_URL = f'https://{AWS_S3_CUSTOM_DOMAIN}/static/'

# Media files
DEFAULT_FILE_STORAGE = 'CustomUser.storages.MediaStorage'  # Replace with the path to your storages.py
# MEDIA_URL = f'https://{AWS_S3_CUSTOM_DOMAIN}/media/'


# SEND EMAIL

EMAIL_HOST = 'smtp.gmail.com'
EMAIL_HOST_USER = 'recychbs.in@gmail.com'
EMAIL_HOST_PASSWORD = 'lbvvmotxwzvyyawm'
EMAIL_PORT = 587
EMAIL_USE_TLS = True
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'


PASSWORD_RESET_TIMEOUT_DAYS = 1  # Password reset token will be valid for 1 day


# For development (to see the email in the terminal)
# EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'

# CSRF_TRUSTED_ORIGINS = [
#     'chrome-extension://eejfoncpjfgmeleakejdcanedmefagga',
# ]


# settings.py (Django)
FRONTEND_URL = "https://django-djreact-app-d5af3d4e3559.herokuapp.com"  # Set this to your actual frontend URL
