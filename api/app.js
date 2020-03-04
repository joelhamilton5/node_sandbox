var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var cors = require('cors'); //
var app = express();

// var whitelist = ['http://localhost:8080', 'http://vue-frontend-tester.s3.us-east-2.amazonaws.com/'];
// app.use(cors({
//     origin: function (origin, callback) {
//         if (whitelist.includes(origin)) {
//             callback(null, true)
//         } else {
//             callback(new Error('Blocked by CORS'))
//         }
//     },
//     credentials: true
// }));

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// assign route handlers
var router = express.Router();
app.use('/', router.get('/', function (req, res, next) {
    res.send('working...');
}));

app.use('/socket', require('./components/socket/socket'));
app.use('/users', require('./components/users/users'));

// catch 404 and forward to error handler
app.use(function (err, req, res, next) {
    res.status(404);
    res.send("404");
    if (err) throw err;
});

// error handler
app.use(function (err, req, res, next) {
    if (err) throw err;

    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(500);
    res.send("500")
});

module.exports = app;
