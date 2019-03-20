const express = require('express');
const passport = require('../config/passportConfig');
const db = require('../models');
const router = express.Router();

router.get('/login', (req, res) => {
	res.render('auth/login.ejs');
});

router.post(
	'/login',
	passport.authenticate('local', {
		successRedirect: '/',
		successFlash: 'You logged in successfully!',
		failureRedirect: '/auth/login',
		failureFlash: 'Invalid credentials. Please try again!',
	})
);

router.get('/signup', (req, res) => {
	res.render('auth/signup.ejs');
});

router.post('/signup', (req, res, next) => {
	console.log('req.body is', req.body);
	db.user
		.findOrCreate({
			where: { email: req.body.email },
			defaults: {
				username: req.body.username,
				firstname: req.body.firstname,
				lastname: req.body.lastname,
				password: req.body.password,
			},
		})
		.spread( (user, wasCreated) => {
			if (wasCreated) {
				//Good job, you didn't try to make a duplicate!
				passport.authenticate('local', {
					successRedirect: '/',
					successFlash: 'You logged in successfully!',
				})(req, res, next);
			} else {
				//Bad job, you tried to make a duplicate when you should've logged in
				req.flash('error', 'Email already exists.');
				res.redirect('/auth/login');
			}
		})
		.catch(function(err) {
			req.flash('error', err.message);
			res.redirect('/auth/signup');
		});
});

router.get('/logout', (req, res) => {
	req.logout();
	req.flash('success', 'You logged out successfully!');
	res.redirect('/');
});

module.exports = router;
