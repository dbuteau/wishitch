#!/bin/bash

# check if it's the first time the docker is launched
if [ ! -f wishitch.db ];then
    # if yes then initialize all
    python3 manage.py generate_secret_key
    python3 manage.py migrate
    python3 manage.py loaddata fixture.yml

    if [ -z "$LOGIN" ] and [ -z "$EMAIL" ] and [ -z $PASSWORD ];then
        python3 manage.py createsuperuser --username $LOGIN --email $EMAIL --passwor $PASSWORD
        python3 manage.py drf_create_token $LOGIN
    else
        echo "ERROR You must give LOGIN, EMAIL and PASSWORD environnment variables"
        exit 1
    fi
fi
#gunicorn djangoapp.wsgi:application --bind 0.0.0.0:8000 --workers 3
python3 manage.py runserver