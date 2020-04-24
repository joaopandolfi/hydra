const express = require('express');
const app = express();
const nunjucks = require('nunjucks');
var expressSession = require('express-session')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var morgan = require("morgan")
var helmet = require("helmet")
var fs = require('fs');
var https = require('https');
var http = require('http')

const router = require('./routes');
const config = require('./configurations/constants')
const pass = require('./configurations/pass')
const gf = require('./configurations/globalFunctions')
const socket = require('./services/socketService')

// Server
app.set('view engine', 'hbs');

// Nunjucks
let njk_env = nunjucks.configure("views", {
    autoescape: true,
    cache: false,
    express: app,
    watch: true
});

//Logs
app.use(morgan("common"))

// Security
app.use(helmet())

// Cookie parser
app.use(cookieParser())
// Body parser
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json())

// Session
app.use(expressSession(pass.session))

if(!config.Debug){
    // HTTPS
    var privateKey  = fs.readFileSync(config.SSL.Key, 'utf8');
    var certificate = fs.readFileSync(config.SSL.Cert, 'utf8');
    var credentials = {key: privateKey, cert: certificate};
}

// Public files
app.use('/public', express.static('public'));
app.use('*/css', express.static('public/css'))
app.use('*/img', express.static('public/img'))
app.use('*/js', express.static('public/js'))
app.use('/public', express.static('public'))

app.use('/', router);

console.log("#### STARTING HYDRA ####")
if (!config.Debug){
    // Listen server
    var httpsServer = https.createServer(credentials, app);

    // HTTPS
    httpsServer.listen(config.Ports.https, function () {
        console.log(`Listening HTTPS at: ${config.Ports.https}`)
    });

    // HTTP
    var httpServer = http.createServer(function (req, res) {
        try{
            res.writeHead(301, { "Location": "https://" + req.headers['host'].replace("www.","") + req.url });
            res.end();
        }catch(e){
            res.writeHead(301,{"Location": "https://" +req.headers['host']});
            res.end();
        }
    })

    // Socket
    socket.Register(httpsServer)

    httpServer.listen(config.Ports.http, () =>{
        console.log(`Listening HTTP at: ${config.Ports.http} and redirect to HTTPS`)
    });
}else {
    var httpServer = http.createServer(app)
    
    // Socket
    socket.Register(httpServer)

    httpServer.listen(config.Ports.http, () =>{
        console.log(`Listening HTTP at: ${config.Ports.http}`)
    });
}
