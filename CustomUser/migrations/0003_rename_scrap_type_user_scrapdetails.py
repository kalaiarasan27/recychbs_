# Generated by Django 5.0.6 on 2024-10-25 18:45

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('CustomUser', '0002_userprofile_active'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Scrap_Type',
            new_name='User_ScrapDetails',
        ),
    ]
