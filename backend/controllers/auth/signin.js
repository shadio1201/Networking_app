require('dotenv').config();
const pool = require('../../utilities/database');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

module.exports = async (req, res, next) => {

    const { username, password } = req.body;

     // If credentials are missing from request, return an error
    if(!username || !password) {
    return res.json({
        error: "Missing credentials",
        });
    }

    const user = await pool.query(`SELECT email, first_name, profile_pic, user_id, isActive, password FROM users WHERE username=$1`, [username]);

    if(user.rowCount === 0) {
        return res.json({
            error: "Wrong username or password",
            });
    } else {

        if(!(await bcrypt.compare(password, user.rows[0].password))) {
            return res.json({
                error: "Wrong username or password",
            });
        }


        if(!user.rows[0].isactive) {
            return res.json({
                error: "Account not verified",
                isNotVerified: true,
                id: user.rows[0].user_id,
                email: user.rows[0].email
            });
        }

        const accessToken = jwt.sign(
        {
            type: 'access',
            user_id: user.rows.user_id
        },
        process.env.JWT_SECRET,
        {
            expiresIn: '3d'
        }
        );

        res.locals.details = { token: accessToken, id: user.rows[0].user_id, email: user.rows[0].email, first_name: user.rows[0].first_name, profile_pic: user.rows[0].profile_pic };

        next();
    }
}