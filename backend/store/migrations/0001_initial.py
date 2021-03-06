# Generated by Django 3.1.3 on 2020-11-22 18:37

import django.contrib.auth.validators
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='Store',
            fields=[
                ('group_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='auth.group')),
                ('store_name', models.CharField(max_length=30, unique=True, validators=[django.contrib.auth.validators.UnicodeUsernameValidator()], verbose_name='store_name')),
                ('store_email', models.EmailField(max_length=255, unique=True, verbose_name='store_email address')),
                ('store_password', models.CharField(max_length=128, verbose_name='store_password')),
                ('date_joined', models.DateTimeField(default=django.utils.timezone.now, verbose_name='date_joined')),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('withdrawal_at', models.DateTimeField(blank=True, null=True)),
            ],
            bases=('auth.group',),
        ),
    ]
