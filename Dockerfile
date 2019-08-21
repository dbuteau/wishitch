FROM python:latest
LABEL vcs-url=https://github.com/dbuteau/wishitch
LABEL docker.params=HOSTNAME,ADMIN_LOGIN,ADMIN_EMAIL,ADMIN_PASSWORD

WORKDIR /usr/src/app

ENV export DJANGO_SETTINGS_MODULE=wishitch.settings
ENV PYTHONUNBUFFERED 1

COPY requirements.txt ./
RUN pip3 install --no-cache-dir -r requirements.txt

COPY website /usr/src/app
RUN python3 manage.py makemigrations
RUN python3 manage.py makemigrations wishitch
RUN python3 manage.py migrate
RUN python3 manage.py loaddata fixture.yaml

COPY init.sh ./init.sh
RUN chmod +x ./init.sh


ENTRYPOINT ["./init.sh"]
