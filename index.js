require('dotenv').config();
var express = require('express');
var ejsLayouts = require('express-ejs-layouts');
var flash = require('connect-flash');
var isLoggedIn = require('./middleware/isLoggedIn.js');
var passport = require('./config/passportConfig.js');
var session = require('express-session');
var app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(ejsLayouts);
app.use(
	session({
		//session has to be ABOVE passport and flash
		secret: process.env.SESSION_SECRET,
		resave: false,
		saveUninitialized: true,
	})
);
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(function(req, res, next) {
	res.locals.currentUser = req.user;
	res.locals.alerts = req.flash();
	next();
});
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
	let landingPage = req.user ? 'dashboard.ejs' : 'landingpage.ejs';
	res.render(landingPage);
});

app.use('/auth', require('./controllers/auth'));
app.use('/posts', require('./controllers/posts'));

app.listen(process.env.PORT || 3000);
