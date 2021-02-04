require('dotenv').config();
import express from "express";
import configViewEngine from "./configs/viewEngine";
import initWebRoutes from "./routes/web";
import bodyParser from "body-parser";
import cookieParser from 'cookie-parser';
import session from "express-session";
import connectFlash from "connect-flash";
import passport from "passport";

let app = express();

//partage du dossier node_modules avec le client web
app.use(express.static(__dirname + '/node_modules'));

//use cookie parser
app.use(cookieParser('secret'));

//config session
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 // 86400000 1 day
    }
}));

// Enable body parser post data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Config view engine
configViewEngine(app);

//Enable flash message
app.use(connectFlash());

//Config passport middleware
app.use(passport.initialize());
app.use(passport.session());

// init all web routes
initWebRoutes(app);

let port = process.env.PORT || 3000;
let server = app.listen(port, () =>console.log(`Building a login system with NodeJS is running on http://127.0.0.1:${port}`));

var io = require('socket.io')(server);
// io.on('connection', apiController.respond);

io.on('connection', (socket) =>{
    console.log(`Connecté au client ${socket.id}`)
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

global.io = io; //bad practice but works

