# web: npm run dev && python manage.py collectstatic --noinput && gunicorn HBS_Project.wsgi --log-file -


release:python manage.py migrate && python manage.py collectstatic --noinput
web: gunicorn HBS_Project.wsgi --log-file -