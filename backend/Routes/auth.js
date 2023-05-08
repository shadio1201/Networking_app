const express = require("express");
const router = express.Router();


const signin = require('../controllers/auth/signin');

router.get('/', (req, res, next) => {
    res.json({
        success: true
    })
})

router.post('/login', signin, (req, res, next) => {
    res.json({
        success: true
    })
})

module.exports = router;