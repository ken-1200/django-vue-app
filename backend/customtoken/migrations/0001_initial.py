# Generated by Django 3.1.3 on 2020-11-22 18:37

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='CustomToken',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('key', models.CharField(max_length=64)),
                ('refresh_key', models.CharField(max_length=64)),
                ('expires_in', models.IntegerField(default=3600)),
                ('created', models.DateTimeField(auto_now_add=True, null=True)),
            ],
        ),
    ]
