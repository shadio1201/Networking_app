const express = require("express");
const router = express.Router();

// Controllers
const initCard = require('../controllers/card/initCard');

router.get('/getCard', (req, res) => {

    // send data to request
    res.json({
        card: "This is a template!"
    })
})

router.post('/init', initCard, (req, res) => {
    
    //On success
    res.json({
        message: 'Card succesfully initialized!'
    })
})


module.exports = router;