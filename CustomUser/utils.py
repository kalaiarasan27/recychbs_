# utils.py
import requests
from django.http import JsonResponse
from minio import Minio
from minio.error import S3Error
from django.conf import settings
import logging
import certifi
from urllib3 import PoolManager

def get_minio_client():
    try:
        print(f"{settings.MINIO_ENDPOINT}:{settings.MINIO_PORT}")
        # value =  Minio(
        #     f"{settings.MINIO_ENDPOINT}:{settings.MINIO_PORT}",
        #     access_key=settings.MINIO_ACCESS_KEY,
        #     secret_key=settings.MINIO_SECRET_KEY,
        #     secure=True,  
        #     http_client=certifi.where(),

        # )
        logging.basicConfig(level=logging.DEBUG)

        # print("value",value)
        http_client = PoolManager(cert_reqs="CERT_REQUIRED", ca_certs=certifi.where())
        return Minio(
            f"{settings.MINIO_ENDPOINT}:{settings.MINIO_PORT}",
            access_key=settings.MINIO_ACCESS_KEY,
            secret_key=settings.MINIO_SECRET_KEY,
            secure=True,
            http_client=http_client,  # Pass the custom HTTP client
        )
    except Exception as e:
        print(f"Error connecting to Minio: {e}")
        return JsonResponse({'error': 'Error connecting to Minio'}, status=500)


DEBOUNCE_API_KEY = '66f195d2ef55b' #'66f02e8eeb216'

def check_email_validity(email):
    debounce_url = 'https://api.debounce.io/v1/'
    params = {
        'api': DEBOUNCE_API_KEY,
        'email': email
    }
    
    try:
        response = requests.get(debounce_url, params=params)
        if response.status_code == 200:
            result = response.json()
            # Result has a 'debounce' key with a status like 'Safe', 'Invalid', etc.
            return result['debounce']
        else:
            return {'error': 'Failed to validate email'}
    except requests.exceptions.RequestException as e:
        return {'error': str(e)}

from PIL import Image, ImageFilter
import numpy as np

def is_image_blurry(image_path):
    """
    Function to check if an image is blurry.
    Uses the variance of the Laplacian method to determine if an image is blurry.
    """
    try:
        img = Image.open(image_path)
        gray = img.convert('L')
        laplacian = gray.filter(ImageFilter.FIND_EDGES)
        laplacian_array = np.array(laplacian)
        print("laplacian_array",laplacian_array)
        variance = laplacian_array.var()
        print("variance",variance)
        threshold = 100  
        return variance < threshold
    except Exception as e:
        print(f"Error checking image blur: {e}")
        return True
