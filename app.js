var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var partials = require('express-partials');
var session = require('express-session');

//var users = require('./routes/users');
var routes = require('./routes/index');
var methodOverride = require('method-override');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(partials());

// uncomment after placing your favicon in /public
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser('Quiz 2015'));
app.use(session());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

// Helpers dinamicos:
app.use(function(req, res, next) {
  // comprobamos la variable de session
/*  if(!req.session.ultFecha)
  {
    req.session.ultFecha = new Date();
    console.log(req.session.ultFecha);
  }
  else
  {
    var dtCurrent = new Date();
    var dtOld = req.session.ultFecha;
    var dtDiff = Math.ceil(Math.abs(dtCurrent.getTime() - dtOld.getTime()) / (60 * 1000));
    console.log('Tiempo:' + dtDiff);
  } */

  // guardar path en session.redir para despues de login
  if (!req.path.match(/\/login|\/logout/)) {
  //if (req.method === 'GET' && !req.path.match(/\/login|\/logout/)) {    
    req.session.redir = req.path;
  }

  // Hacer visible req.session en las vistas
  res.locals.session = req.session;
  next();
});


app.use(function(req, res, next) {
  console.log('ultFecha_:' + req.session);
  console.log('ultFecha:' + req.session.ultFecha);
  if(req.session.user)
  {
    // No existe la ultima fecha de acceso, iniciado logon
    if(!req.session.ultFecha)
    {
        // guardamos la ultima fecha de acceso
        req.session.ultFecha = (new Date()).toString();
        console.log('Fecha Inicial:' + req.session.ultFecha);
    }
    else
    {
      var dtCurrent = new Date();
      //console.log('dtOld_:' + req.session.ultFecha);
      var dtOld = new Date(req.session.ultFecha);
      //console.log('dtOld:' + dtOld);
      var dtDiff = (dtCurrent.getTime() - dtOld.getTime()) / (60 * 1000);
      console.log('Tiempo inactivo:' + dtDiff);

      if(dtDiff > 2)
      {
        console.log('Borrar Sesion:' + dtDiff);
        //req.session.destroy(req, res);
        delete req.session.ultFecha;
        delete req.session.user;
      }
      else
      {
        req.session.ultFecha = (new Date()).toString();
        console.log('Fecha Actual:' + req.session.ultFecha);
      }
    }
  }
  next(); 
});

app.use('/', routes);
//app.use('/users', users);

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
        res.render('error', {
            message: err.message,
            error: err,
            errors:[]
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {},
        errors:[]
    });
});


module.exports = app;
