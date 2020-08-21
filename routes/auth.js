const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const auth = require('../middleware/auth')
const { check, validationResult } = require('express-validator');
const User = require('../models/User')

const router = express.Router()

// @route  POST api/users

router.get('/', auth, async (req, res) => {
    try{
        const user = await User.findById(req.user.id).select('-password')
        res.json(user)
    }catch(err){
        console.log(err.message)
        return res.status(500).send('server error')
    }
});

router.post('/', [
    check('email', 'please include a valid email').isEmail(),
    check('password', 'password required').exists()
], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        })
    }

    const { email, password } = req.body

    try {
        let user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ msg: 'invalid credentials' })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch){
            return res.status(400).json({ msg: 'invalid credentials' })
        }

        const payload = {
            user: {
                id: user.id
            }
        }
    
        jwt.sign(payload, config.get('jwtSecret'), {
            expiresIn: 360000
        }, (err, token)=>{
            if(err) throw err;
            res.json({token})
        })

    } catch (e) {
        console.log(e.message);
    res.status(500).send('server error')
    }

});

module.exports = router;