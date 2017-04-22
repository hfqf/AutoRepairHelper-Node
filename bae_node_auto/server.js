var express         = require('express');
var path            = require('path');
var favicon         = require('serve-favicon');
var logger          = require('morgan');
var cookieParser    = require('cookie-parser');
var bodyParser      = require('body-parser');
var mongoose        = require('./db/mongoose');
var db              = mongoose();
var partials        = require('express-partials');

var log_bae = require('./utils/logger4js');

global.config       = require('./utils/config');
global.retFormate   = function (state,ret,msg) {
  var json = {'code' : state ,
    'msg'  : msg,
    'ret'  : ret
  };

    global.log4bae(JSON.stringify(json));
    return JSON.stringify(json);
};
global.log4bae         = function (msg) {
    log_bae.log(msg);
};

global.logError4bae    = function (msg) {
    log_bae.errBae(msg);
};

var index = require('./routes/index');
var users = require('./routes/users');
var register = require('./routes/register');
var async = require('./routes/async');
var noticeboard = require('./routes/noticeboard');
var push = require('./routes/push');
var update = require('./routes/update');
var contact = require('./routes/contact');
var repair = require('./routes/repair');
var prom =  require('./routes/prom');
var repstatistic = require('./routes/repairstatistics');
var repairitem = require('./routes/repairitem');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('view options', {
  layout: false
});
app.use(partials());
app.use(logger('dev'));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
log4bae(path.join(__dirname, 'public'));
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(bodyParser.json({limit:'10000kb'}));
app.use(bodyParser.urlencoded({limit:'10000kb',extended:true}));


app.use('/', index);
app.use('/users', users);
app.use('/register', register);
app.use('/async', async);
app.use('/noticeboard', noticeboard);
app.use('/push', push);
app.use('/update',update);
app.use('/contact',contact);
app.use('/repair',repair);
app.use('/prom',prom);
app.use('/repairstatistics',repstatistic);
app.use('/repairitem',repairitem);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    // res.render('error', {
    //   message: err.message,
    //   error: err
    // });
      console.error(err);
      global.logError4bae(err.message.toString());
      res.send(err);
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
    console.error(err);
    res.send(err);
  // res.render('error', {
  //   message: err.message,
  //   error: {}
  // });
});




module.exports = app;
