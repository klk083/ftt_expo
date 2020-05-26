let fs = require('fs')
//let http = require('http');
let https = require('https')
let privateKey = fs.readFileSync(
    '/etc/letsencrypt/live/ftt.idi.ntnu.no/privkey.pem',
    'utf-8'
)
let certificate = fs.readFileSync(
    '/etc/letsencrypt/live/ftt.idi.ntnu.no/fullchain.pem',
    'utf-8'
)
let credentials = {key: privateKey, cert: certificate}

let express = require('express')
let app = express()

let routers = require('./routers')

app.all('*', routers)

//let httpServer = http.createServer(app);
let httpsServer = https.createServer(credentials, app)

//httpServer.listen(80);
httpsServer.listen(443)

console.log('server started at 443')
