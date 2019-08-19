# wishitch
Host your own online wishlist, and add gift to it with a Firefox Extension

## Two parts
### the WebExtension
xpi directory contain the firefox (only) webextension, tested on Firefox Quantum v68.0.2(64bits).
add a "gift" icon in url adress bar and open a popup when clicked.
The popup try to guess what image, price and name of the gift you want before submiting it to the api.

You need to go in the extension options to fill the url of your server and the private token allowing your to post on the api

### Server
The server have url:
- "your_server.example.com/" : index page displaying all wishes you posted on api
- "your_server.example.com/api/wishes/" : the api page, in get can freely consult, in post you need token to create new wish
- "your_server.example.com/api/docs/" : the doc of the api
- "your_server.example.com/admin" : where you can login and access database (delete, add, update etc)

#### How to install
With docker-compose:
```
version: '3'
services:
  wishitch:
    image: "dbuteau/wishitch:latest"
    ports:
      - "8000:8000"
    environment:
      HOSTNAME: "['example.com','127.0.0.1','localhost']"
      ADMIN_LOGIN: admin
      ADMIN_EMAIL: admin@example.com
      ADMIN_PASSWORD: admin
```
replace port, and environment variables according to your needs.
