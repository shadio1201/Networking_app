const express = require("express");
const router = express.Router();


const signin = require('../controllers/auth/signin');
const refreshCheck = require('../controllers/auth/refreshCheck');

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

router.post('/refreshCheck', refreshCheck, (req, res, next) => {
    res.json({...res.locals.currentUser})
})

module.exports = router;