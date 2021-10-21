# JS Based Graphic charts for LAMP server (XAMPP).
HTML/JS/CSS Client will request data via AJAX procedure using jQuery. 
This data will be displayed as interactive charts.

## MySQL
User: admin
Pass: admin
Database Name: onu-modem-data
Table 1: ONU [SN, OLT_RX, ONU_RX, HORA]

## Server side - Request listening and Query.
```/opt/lmapp/htdocs/requestHandlers/config.php```: Sets connection with database.
```/opt/lmapp/htdocs/requestHandlers/onuReqHandle.php```: Executes Query and echo's the result. Also needs CORS Headers.

## Client side - Data request and graphic viewer.
Principal class graphic-view located at: ```/assets/js/graphic-view.js```
