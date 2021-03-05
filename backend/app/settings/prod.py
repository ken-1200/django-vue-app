import os
from .base import *
import environ

# settings.pyの位置を起点として３つ上の親ディレクトリを参照。
# BASE_DIR = environ.Path(__file__) - 3

# env = environ.Env()

# 環境変数でDJANGO_READ_ENV_FILEをTrueにしておくと.envを読んでくれる。
# READ_ENV_FILE = env.bool('DJANGO_READ_ENV_FILE', default=True)
# if READ_ENV_FILE:
#     env_file = str(BASE_DIR.path('.env'))
#     env.read_env(env_file)

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = False
# パブリックIPv4アドレス(EIP)/ パブリックIPv4DNS/ CNAME プロパティの値
ALLOWED_HOSTS = ['backend.furrisode.com']

# S3共通の設定(本番)
AWS_ACCESS_KEY_ID = os.environ.get('ACCESS_KEY_ID')
AWS_SECRET_ACCESS_KEY = os.environ.get('SECRET_ACCESS_KEY')

AWS_QUERYSTRING_AUTH = False

# S3共通の設定
AWS_STORAGE_BUCKET_NAME = 'django-static-file'
AWS_S3_CUSTOM_DOMAIN = '%s.s3.amazonaws.com' % AWS_STORAGE_BUCKET_NAME
# 1日はそのキャッシュを使う
AWS_S3_OBJECT_PARAMETERS = {
    'CacheControl': 'max-age=86400',
}

# 静的ファイルの設定
AWS_LOCATION = 'static'
STATICFILES_STORAGE = 'storages.backends.s3boto3.S3Boto3Storage'
STATIC_URL = "https://%s/%s/" % (AWS_S3_CUSTOM_DOMAIN, AWS_LOCATION)

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/3.0/howto/static-files/
STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'static')

# mediaフォルダの場所
# url指定
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')
MEDIA_URL = '/media/'

# メディアファイルの設定
DEFAULT_FILE_STORAGE = 'app.settings.backends.MediaStorage'

# Database
# https://docs.djangoproject.com/en/3.0/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': os.environ.get('MYSQL_DATABASE'),
        'USER': os.environ.get('MYSQL_USER'),
        'PASSWORD': os.environ.get('MYSQL_PASSWORD'),
        'HOST': os.environ.get('MYSQL_HOST'),
        'PORT': os.environ.get('MYSQL_PORT'),
        'OPTIONS': {
            'init_command': "SET sql_mode='STRICT_TRANS_TABLES'",
            'charset': 'utf8mb4',
        }
    }
}
