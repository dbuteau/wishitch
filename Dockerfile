FROM python:latest

WORKDIR /usr/src/app

ENV export DJANGO_SETTINGS_MODULE=wishitch.settings
ENV PYTHONUNBUFFERED 1
VOLUME /static

COPY requirements.txt ./
RUN pip3 install --no-cache-dir -r requirements.txt

COPY init.sh /init.sh
COPY website /usr/src/app
RUN chmod +x /init.sh

ENTRYPOINT ["/init.sh"] 
