const express = require('express');
const router = express.Router();
const db = require('../models');
const isLoggedIn = require('../middleware/isLoggedIn.js');

router.get('/new', (req, res) => {
	var allSites;
	db.site.findAll().then(sites => {
		res.render('posts/new.ejs', { sites });
	});
});

router.post('/', (req, res) => {
	db.post
		.create({
			subject: req.body.subject,
			content: req.body.content,
		})
		.then(createdPost => {
			topics = req.body.topics.split(', ');
			topics.forEach(t => {
				db.topic
					.create({
						name: t,
					})
					.then(createdTopic => {
						createdTopic.addPost(createdPost);
					});
			});
		});

	res.send(req.body);
});

module.exports = router;
