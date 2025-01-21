# Generated by Django 5.0.6 on 2024-10-14 16:23

import django.contrib.auth.models
import django.db.models.deletion
import django.utils.timezone
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='Dealer_Details',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('Dealer_ID', models.IntegerField(unique=True)),
                ('Dealer_Name', models.CharField(max_length=50)),
                ('mail_id', models.EmailField(max_length=254)),
                ('DOB', models.CharField(max_length=60)),
                ('Address', models.CharField(max_length=100, null=True)),
                ('Street', models.CharField(max_length=50, null=True)),
                ('City', models.CharField(max_length=50, null=True)),
                ('State', models.CharField(max_length=30, null=True)),
                ('Post_Code', models.CharField(max_length=10, null=True)),
                ('Country', models.CharField(max_length=20, null=True)),
                ('Nationality', models.CharField(max_length=30, null=True)),
                ('Phone_Number', models.CharField(max_length=30, null=True)),
                ('Aadhar_No', models.BigIntegerField()),
                ('Aadhar_Front_Photo', models.FileField(upload_to='Dealer_Aadhar_Img')),
                ('Aadhar_Back_Photo', models.FileField(upload_to='Dealer_Aadhar_Img')),
                ('PAN_No', models.CharField(max_length=20)),
                ('PAN_Photo', models.FileField(upload_to='Dealer_Pan_Img')),
                ('LICENSE_No', models.CharField(max_length=20)),
                ('LICENSE_Front_Photo', models.FileField(upload_to='Dealer_License_Img')),
                ('LICENSE_Back_Photo', models.FileField(upload_to='Dealer_License_Img')),
                ('Vehicle_No', models.CharField(max_length=25)),
                ('RC_BOOK_Photo', models.FileField(upload_to='Dealer_RCBook_Img')),
                ('Bank_Acc', models.BigIntegerField(null=True)),
                ('IFSC_CODE', models.CharField(max_length=30, null=True)),
                ('Bank_AccountName', models.CharField(max_length=40, null=True)),
                ('Bank_Statement_Photo', models.FileField(upload_to='Bank_Statement')),
                ('PassBook_Photo', models.FileField(upload_to='PassBook_Photo')),
                ('Vehicle_Type', models.CharField(max_length=30, null=True)),
                ('Fees_Paid', models.CharField(choices=[('notPaid', 'NotPaid'), ('paid', 'Paid')], default='notpaid', max_length=30)),
                ('application_status', models.CharField(default='waiting', max_length=20)),
                ('requirements', models.TextField(blank=True, null=True)),
                ('extradata_field1', models.FileField(blank=True, null=True, upload_to='Extra_Images')),
                ('extradata_field2', models.FileField(blank=True, null=True, upload_to='Extra_Images')),
                ('extradata_field3', models.FileField(blank=True, null=True, upload_to='Extra_Images')),
                ('extradata_field4', models.FileField(blank=True, null=True, upload_to='Extra_Images')),
                ('dealer_message', models.TextField(blank=True, null=True)),
                ('aadhar_PDF', models.FileField(blank=True, null=True, upload_to='AadharPDF')),
            ],
        ),
        migrations.CreateModel(
            name='scrap_selection',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('scrap_name', models.JSONField(null=True)),
                ('scrap_price', models.JSONField(null=True)),
                ('scrap_image', models.ImageField(null=True, upload_to='Scrap_Selection_Images')),
                ('date', models.CharField(max_length=50, null=True)),
                ('time', models.CharField(max_length=50, null=True)),
                ('address', models.CharField(max_length=50, null=True)),
                ('status', models.CharField(default='pending', max_length=50, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Scrap_Type',
            fields=[
                ('Scrap_ID', models.AutoField(primary_key=True, serialize=False)),
                ('Scrap_Name', models.CharField(max_length=50)),
                ('Current_Price_Per_KG', models.IntegerField(null=True)),
                ('Scrap_Image', models.ImageField(upload_to='Scrap_Images')),
                ('Price_Updated_At', models.DateTimeField(auto_now=True)),
            ],
        ),
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('is_superuser', models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status')),
                ('first_name', models.CharField(blank=True, max_length=150, verbose_name='first name')),
                ('last_name', models.CharField(blank=True, max_length=150, verbose_name='last name')),
                ('is_staff', models.BooleanField(default=False, help_text='Designates whether the user can log into this admin site.', verbose_name='staff status')),
                ('is_active', models.BooleanField(default=True, help_text='Designates whether this user should be treated as active. Unselect this instead of deleting accounts.', verbose_name='active')),
                ('date_joined', models.DateTimeField(default=django.utils.timezone.now, verbose_name='date joined')),
                ('username', models.CharField(max_length=150)),
                ('phone_number', models.CharField(max_length=15, unique=True)),
                ('email', models.EmailField(max_length=254, unique=True)),
                ('role', models.CharField(choices=[('USER', 'User'), ('DEALER', 'Dealer'), ('ADMIN', 'Admin')], default='USER', max_length=10)),
                ('groups', models.ManyToManyField(blank=True, related_name='customuser_groups', to='auth.group')),
                ('user_permissions', models.ManyToManyField(blank=True, related_name='customuser_permissions', to='auth.permission')),
            ],
            options={
                'verbose_name': 'user',
                'verbose_name_plural': 'users',
                'abstract': False,
            },
            managers=[
                ('objects', django.contrib.auth.models.UserManager()),
            ],
        ),
        migrations.CreateModel(
            name='UserProfile',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('User_Name', models.CharField(max_length=255)),
                ('Email', models.EmailField(max_length=254, null=True, unique=True)),
                ('Address', models.CharField(max_length=120, null=True)),
                ('Nationality', models.CharField(max_length=50, null=True)),
                ('Phone_Number', models.CharField(max_length=120, null=True)),
                ('user', models.OneToOneField(limit_choices_to={'role': 'USER'}, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='DealerProfile',
            fields=[
                ('Dealer_ID', models.AutoField(primary_key=True, serialize=False)),
                ('Dealer_Name', models.CharField(max_length=255)),
                ('Email', models.EmailField(max_length=254, null=True, unique=True)),
                ('Address', models.CharField(max_length=120, null=True)),
                ('Natioanality', models.CharField(max_length=50, null=True)),
                ('Phone_Number', models.CharField(max_length=120, null=True)),
                ('Total_Scrap_Collected', models.IntegerField(null=True)),
                ('user', models.OneToOneField(limit_choices_to={'role': 'DEALER'}, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='AdminProfile',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('role_description', models.TextField()),
                ('user', models.OneToOneField(limit_choices_to={'role': 'ADMIN'}, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'Admin Profile',
                'verbose_name_plural': 'Admin Profiles',
            },
        ),
    ]
