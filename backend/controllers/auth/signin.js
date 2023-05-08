const pool = require('../../utilities/database');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

module.exports = async (req, res, next) => {

    const { username, password } = req.body;

     // If credentials are missing from request, return an error
    if (!email || !password) {
    return res.json({
        message: "Missing credentials",
        });
    }
    try {
        const user = await pool.query(`SELECT username, password FROM users WHERE username=$1`, [username]);

        console.log(user);
    }
    catch (err) {
        res.json({
        error: err.message
        })
    }
    next();
}