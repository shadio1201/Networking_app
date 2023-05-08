require('dotenv').config();
const pool = require('../../utilities/database');
const jwt = require('jsonwebtoken')

module.exports = async (req, res, next) => {

    // Verifing user
    const token = req.body.token;

    let id = null;

    if(token) {
    try {


        jwt.verify(token, process.env.JWT_SECRET, (e, decoded) => {
            if(e) {
                console.log(e);
                return res.status(403)
            } else {
                id = decoded.id;
            }
        })

        await pool.query("UPDATE users SET isActive=true WHERE user_id=$1", 
        [id]);
    }
    catch (err) {
        res.json({
        error: err.message
        })
    }
    } else {
        res.status(403).json({
            error: 'Invalid token'
        })
    }
    next();
}