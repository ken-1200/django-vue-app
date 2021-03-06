import os
from .base import *

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = []

# S3共通の設定(開発)
AWS_ACCESS_KEY_ID = os.environ['AWS_ACCESS_KEY_ID']
AWS_SECRET_ACCESS_KEY = os.environ['AWS_SECRET_ACCESS_KEY']

# Database
# https://docs.djangoproject.com/en/3.0/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': os.environ['DJANGO_MYSQL_DATABASE'],
        'USER': os.environ['DJANGO_MYSQL_USER'],
        'PASSWORD': os.environ['DJANGO_MYSQL_PASSWORD'],
        'HOST': os.environ['DJANGO_MYSQL_HOST'],
        'PORT': os.environ['DJANGO_MYSQL_PORT'],
        'OPTIONS': {
            'charset': 'utf8mb4',
        },
        'TEST': {
            'NAME': 'test_database',
        },
    }
}
