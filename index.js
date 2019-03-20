require('dotenv').config();
const express = require('express');
const ejsLayouts = require('express-ejs-layouts');
const flash = require('connect-flash');
const isLoggedIn = require('./middleware/isLoggedIn.js');
const passport = require('./config/passportConfig.js');
const session = require('express-session');
const app = express();

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
app.use( (req, res, next) => {
	res.locals.currentUser = req.user;
	res.locals.alerts = req.flash();
	next();
});
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
	let landingPage = req.user ? 'dashboard.ejs' : 'landingpage.ejs';
	res.render(landingPage);
});

app.use('/auth', require('./controllers/auth'));
app.use('/posts', require('./controllers/posts'));

app.listen(process.env.PORT || 3000);
