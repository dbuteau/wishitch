#! /bin/bash

set -e; set -x
# check if it's the first time the docker is launched
if [ ! -f wishitch.db ];then
    # if yes then initialize all
    python3 manage.py makemigrations
    python3 manage.py makemigrations wishitch
    python3 manage.py migrate --fake-initial
    python3 manage.py loaddata fixture.yaml
    python3 manage.py generate_secret_key --replace

    if [ -z ${HOSTNAME+x} ];then
        echo "for security reason give HOSTNAME environment variable"
    else
        if [[ "$HOSTNAME" == *"["* ]]; then
            sed -i "s/ALLOWED_HOSTS = .*/ALLOWED_HOSTS = $HOSTNAME/" wishitch/settings.py 
        else
            sed -i "s/ALLOWED_HOSTS = \['.*'\]/ALLOWED_HOSTS = \['$HOSTNAME'\]/" wishitch/settings.py 
        fi
    fi
    if [ -z ${ADMIN_LOGIN+x} ] || [ -z ${ADMIN_EMAIL+x} ] || [ -z ${ADMIN_PASSWORD+x} ];then
        echo "ERROR You must give ADMIN_LOGIN, ADMIN_EMAIL and ADMIN_PASSWORD environnment variables"
        exit 1
    else
        python3 manage.py shell -c "from django.contrib.auth.models import User; User.objects.create_superuser('$ADMIN_LOGIN', '$ADMIN_EMAIL', '$ADMIN_PASSWORD')"
        #python3 manage.py createsuperuser --username $ADMIN_LOGIN --email $ADMIN_EMAIL --password $ADMIN_PASSWORD
        python3 manage.py drf_create_token "$ADMIN_LOGIN"
    fi
fi
python3 manage.py collectstatic --noinput
python3 manage.py runserver 0.0.0.0:8000
