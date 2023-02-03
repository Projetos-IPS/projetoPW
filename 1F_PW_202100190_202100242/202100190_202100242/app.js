var createError = require('http-errors');
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');

const oneDay = 1000 * 60 * 60 * 24;

var app = express();
app.use(session({
  secret : 'secret',
  resave: false,
  cookie: {maxAge: oneDay},
	saveUninitialized: true
}));

var indexRouter = require('./routes/index');
var joboffersRouter = require('./routes/joboffers');
var teamRouter = require('./routes/team');
var profileRouter = require('./routes/profile');
var homeRouter = require('./routes/home');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/out', indexRouter);
app.use('/Homepage', indexRouter);
app.use('/Job%20offers', joboffersRouter);
app.use('/Team', teamRouter);
app.use('/Profile', profileRouter);
app.use('/Home', homeRouter);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
