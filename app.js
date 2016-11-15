var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// Intento fallido de usar parámetro estándar de los navegadores 'Accept-Language' en lugar de parámetro 'language' propio
  // var requestLanguage = require('express-request-language');  Me da error
  // app.use(requestLanguage({languages: ['en-US', 'es-ES']);

var routes = require('./routes/index');

var app = express();

require('./lib/mongoConnection');                  // Cargamos conexión de Moongoose
require('./models/Articulo');                      // Cargamos modelo Articulo
require('./models/Usuario');                       // Cargamos modelo Usuario


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(express.static(path.join(__dirname, 'public')));          // indicamos directorio public para ficheros estático

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', require('./routes/index'));                          // Cargamos ruta básica
app.use('/apiv1/articulos', require('./routes/apiv1/articulos')); // Cargamos ruta articulos
app.use('/apiv1/users', require('./routes/apiv1/users'));         // Cargamos ruta usuarios
app.use('/apiv1/admin', require('./routes/apiv1/admin'));         // Cargamos ruta admin



// catch 404 and forward to error handler
app.use(function(req, res, next) {

  if (req.headers.language === 'es-ES') {
    var err = new Error('No encontrado');

  } else {
    var err = new Error('Not Found');
  }

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
      error: err
    });
  });
}


// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});




module.exports = app;

