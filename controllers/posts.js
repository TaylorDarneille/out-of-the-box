const express = require('express')
const router = express.Router()

router.get('/new', (req, res) => {
    res.render('posts/new.ejs')
})

router.post('/', (req, res) => {
	res.send(req.body)
})

module.exports = router