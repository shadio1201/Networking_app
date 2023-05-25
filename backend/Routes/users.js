const express = require("express");
const router = express.Router();

// Controllers
const selectedUsers = require('../controllers/user/selectedUsers');
const getUser = require('../controllers/user/getUser');
const getSaved = require('../controllers/user/getSavedProfiles');
const postUser = require('../controllers/user/createUser');
const updateUser = require('../controllers/user/updateUser');
const uploadPic = require('../controllers/user/uploadPic');
const checkAuth = require('../controllers/auth/check')

router.get('/selected', selectedUsers, (req, res) => {

    // send data to request
    const data = res.locals.users
    res.json(data)
})

router.post('/postUser', postUser, (req, res) => {
    
    //On success
    res.json({
        id: res.locals.id,
        message: 'User created succesfully'
    })
})

router.post('/picture', uploadPic, (req, res) => {
    
    //On success
    res.json({
        message: 'Done!'
    })
})


router.get('/:id', getUser, (req, res) => {
        
    // send data to request
        const data = res.locals.user
        res.json(data)
} )

router.get('/savedProfiles/:id', getSaved, (req, res) => {
        
    // send data to request
        const data = res.locals.user
        res.json(data)
} )


router.put('/update/:id', updateUser, (req, res) => {
        
    // send data to request
    res.json({
        message: 'User succesfully updated!',
        ...res.locals.auth
    })
} )


module.exports = router;