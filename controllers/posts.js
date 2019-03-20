const express = require('express')
const router = express.Router()
const db = require('../models')
const isLoggedIn = require('../middleware/isLoggedIn.js');

router.get('/new', isLoggedIn, (req, res) => {
	if(!req.user) {
		res.send("oops! you're not logged in!")
	}
    res.render('posts/new.ejs')
})

router.post('/', (req, res) => {
	// db.post.insert({
	// 	subject: req.body.subject,
	// 	content: req.body.content,	
	// })
	req.body.topics = req.body.topics.split(", ")
	res.send(req.user)
})

module.exports = router