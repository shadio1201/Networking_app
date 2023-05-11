const express = require("express");
const router = express.Router();

const sentConfirmation = require('../controllers/services/confirmEmail')
const verifyUser = require('../controllers/services/verifyUser')
const likeUser = require('../controllers/services/likeService')
const dislikeUser = require('../controllers/services/dislikeService')
const saveService = require('../controllers/services/saveService')
const checkAuth = require('../controllers/auth/check')

router.get('/', (req, res, next) => {
    res.json({
        success: true
    })
})

router.post('/email/confirmation', sentConfirmation, (req, res, next) => {
    res.json({
        success: true,
        info: res.locals.info
    })
})

router.post('/email/verify', verifyUser, (req, res, next) => {
    res.json({
        success: true
    })
})

router.post('/like', likeUser, (req, res, next) => {
    res.json({
        success: true,
    })
})

router.post('/dislike', checkAuth, dislikeUser, (req, res, next) => {
    res.json({
        success: true
    })
})

router.post('/saveUser', checkAuth, saveService.save, (req, res, next) => {
    res.json({
        success: true
    })
})

router.post('/unsaveUser', checkAuth, saveService.unsave, (req, res, next) => {
    res.json({
        success: true
    })
})


module.exports = router;