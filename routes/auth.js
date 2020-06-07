const express = require('express')

const router = express.Router()

// @route  POST api/users

router.get('/', (req, res)=>{
    res.send('get logged in  user')
});

router.post('/', (req, res)=>{
    res.send('login a user')
});

module.exports = router;