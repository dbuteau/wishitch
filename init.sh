#!/bin/bash

set -e;set -x

# check if it's the first time the docker is launched (db file is empty)
if [ "$(cat datas/secretkey.txt)" == "empty"  ];then
    python3 manage.py generate_secret_key --replace

    if [ -z ${ADMIN_LOGIN+x} ] || [ -z ${ADMIN_EMAIL+x} ] || [ -z ${ADMIN_PASSWORD+x} ];then
        echo "ERROR You must give ADMIN_LOGIN, ADMIN_EMAIL and ADMIN_PASSWORD environnment variables"
        exit 1
    else
        python3 manage.py shell -c "from django.contrib.auth.models import User; User.objects.create_superuser('$ADMIN_LOGIN', '$ADMIN_EMAIL', '$ADMIN_PASSWORD')"
        python3 manage.py drf_create_token "$ADMIN_LOGIN"
    fi
fi

# check if mandatory env variables is given
if [ -z ${HOSTNAME+x} ];then
    echo "for security reason give HOSTNAME environment variable"
else
    TRUE_IP=`hostname -I | awk '{$1=$1};1'`  # Adding in case of docker
    sed -i "s/ALLOWED_HOSTS = \['.*'\]/ALLOWED_HOSTS = \[$HOSTNAME,'$TRUE_IP','127.0.0.1'\]/" wishitch/settings.py
fi

python3 manage.py collectstatic --noinput
python3 manage.py runserver 0.0.0.0:8000
