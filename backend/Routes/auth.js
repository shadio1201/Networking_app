const express = require("express");
const router = express.Router();


const signin = require('../controllers/auth/signin');
const signout = require('../controllers/auth/signout');
const refresh = require('../controllers/auth/refresh');

router.get('/', (req, res, next) => {
    res.json({
        success: true
    })
})

router.post('/login', signin, (req, res, next) => {
    res.json({
        message: 'Authenticated!',
        ...res.locals.details
    })
})

router.post('/logout', signout, (req, res, next) => {
    res.json({
        message: 'logged out!'
    })
})

router.post('/refresh', refresh, (req, res, next) => {
    res.json({...res.locals.currentUser})
})

module.exports = router;