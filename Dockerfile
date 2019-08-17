FROM python:latest-alpine

WORKDIR /usr/src/app

COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY init.sh /init.sh
COPY website/ .

ENTRYPOINT ["/init.sh"] 
CMD [ "command" ]