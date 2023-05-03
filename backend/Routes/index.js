const express = require("express");
const router = express.Router();

//Routes go here

router.get('/', (req, res)=> {
    res.send('This is a test!')
})

module.exports = router;