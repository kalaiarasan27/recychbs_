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

# ALLOWED_HOSTS = ['django-djreact-app-d5af3d4e3559.herokuapp.com']
ALLOWED_HOSTS = ['127.0.0.1', 'localhost','www.recychbs.in']

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
    'channels',
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


# STATICFILES_DIRS = [
#     os.path.join(BASE_DIR, 'dist','assets'),
# ]



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
ASGI_APPLICATION = "HBS_Project.asgi.application"

# CHANNEL_LAYERS = {
#     "default": {
#         "BACKEND": "channels_redis.core.RedisChannelLayer",
#         "CONFIG": {
#             "hosts": [("127.0.0.1", 6379)],
#         },
#     },
# }
CHANNEL_LAYERS = {
    "default": {
        "BACKEND": "channels.layers.InMemoryChannelLayer",
    },
}


# Database
# https://docs.djangoproject.com/en/5.0/ref/settings/#databases

# DATABASES = {
#     'default': dj_database_url.parse(os.environ.get('mysql://vp74v4k1viap1uyd:t2ubeigrwyu0jqyg@qbhol6k6vexd5qjs.cbetxkdyhwsb.us-east-1.rds.amazonaws.com:3306/bong599rpr85d37q'), conn_max_age=600)
# }
# mysql://kaeke0tmhf4bz69i:up8pxiy2537ajbi7@z12itfj4c1vgopf8.cbetxkdyhwsb.us-east-1.rds.amazonaws.com:3306/dp3ec3zdfkpv7pgx
# DATABASES = {
#     'default': {
#         'ENGINE': 'django.db.backends.mysql',
#         'NAME': 'dp3ec3zdfkpv7pgx',
#         'HOST':'z12itfj4c1vgopf8.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
#         'USER':'kaeke0tmhf4bz69i',
#         'PASSWORD':'up8pxiy2537ajbi7',
#         'PORT':'3306',
#     }
# }
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

# DATABASES = {
#     'default': {
#         'ENGINE': 'django.db.backends.mysql',  # MySQL engine for Django
#         'NAME': 'if0_37564101_recycle',        # Your database name
#         'HOST': 'sql307.infinityfree.com',     # Make sure there is no tab or extra space
#         'USER': 'if0_37564101',                # Your MySQL username
#         'PASSWORD': 'ZUxFS1SIMN8IHS',          # Your MySQL password
#         'PORT': '3306',                        # MySQL default port
#         'CONN_MAX_AGE': 60,                    # Optional, maintain DB connection for 60 seconds
#     }
# }


# DATABASES = {
#     'default': {
#         # 'ENGINE': 'mysql.connector.django',
#         'ENGINE': 'django.db.backends.mysql',
#         'NAME': 'recychbsDatabase',
#         'HOST':'mydatabase.c7uwckmeq5ur.eu-north-1.rds.amazonaws.com',
#         'USER':'admin',
#         'PASSWORD':'HUDSMERBUSINESSSOLUTIONS',
#         'PORT':'3306',
#         'CONN_MAX_AGE': 60,  # Close connection after 60 seconds of idle time
#     }
# }




# Custom User
# AUTHENTICATION_BACKENDS = [
#     'HBS_Project.backends.UsernamePhoneBackend',  # Custom backend for username, phone, and password
#     'django.contrib.auth.backends.ModelBackend',  # Default backend
# ]
AUTH_USER_MODEL = 'CustomUser.User'


# MEDIA_ROOT = '/media/'

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
    'https://app.recychbs.in',
    'https://recychbs-app-c05d5f684be1.herokuapp.com',  # React app's URL
    'https://recychbs-admin-app-527051e76757.herokuapp.com',
    'https://recychbs.in',
    'https://www.recychbs.in'
    # 'http://recychbsadmin.in',
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
    'https://app.recychbs.in',
    'https://recychbs-app-c05d5f684be1.herokuapp.com', 
    'https://recychbs-admin-app-527051e76757.herokuapp.com',
    'https://recychbs.in',
    'https://www.recychbs.in'
    # 'http://recychbsadmin.in',
    # 'https://demo-djreact-recyc-app-ee540343796a.herokuapp.com'

]


SESSION_ENGINE = 'django.contrib.sessions.backends.db'  # Default: use database for session storage

# Important for allowing cross-origin cookies to be shared:
SESSION_COOKIE_SAMESITE = None  # Allow the session cookie to be shared across different origins
SESSION_COOKIE_SECURE = False  # Set to True in production when using HTTPS
CORS_ALLOW_CREDENTIALS = True# settings.py
SESSION_COOKIE_SECURE = False  # Set to True in production with HTTPS
# Set session to expire after a certain number of seconds
SESSION_COOKIE_AGE = 1209600  # 2 weeks, default is 1209600 seconds
SESSION_EXPIRE_AT_BROWSER_CLOSE = False  # Keep session active even after browser close
SESSION_ENGINE = 'django.contrib.sessions.backends.db'


django_heroku.settings(locals())






from django.conf import settings




DATA_UPLOAD_MAX_MEMORY_SIZE = 104857600  # 100MB



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
FRONTEND_URL = "https://www.recychbs.in"  # Set this to your actual frontend URL

GDAL_LIBRARY_PATH = os.path.join('C:\\OSGeo4W\\bin\\adal.dll')  # Adjust 'gdal304.dll' as necessary


DATA_UPLOAD_MAX_MEMORY_SIZE = 104857600  # 100MB
FILE_UPLOAD_MAX_MEMORY_SIZE = 104857600  # 100MB



MINIO_ENDPOINT = "82.112.238.156"
MINIO_ACCESS_KEY = "minioadmin"
MINIO_SECRET_KEY = "minioadmin"
MINIO_BUCKET_NAME = "mybucket"
MINIO_PORT =  9000 # Default MinIO port 37883
