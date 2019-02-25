const express = require('express')
const router = express.Router()

router.get('/new', function(req, res){
    res.render('posts/new.ejs')
})

module.exports = router