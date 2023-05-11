require('dotenv').config();
const pool = require('../../utilities/database');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require('uuid');

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

        const sessionId = uuidv4();

        const refresh = jwt.sign(
            {
                type: 'refresh',
                sessionId
            },
            process.env.JWT_REFRESH,
            {
                expiresIn: '30d'
            }
            );

        const hasAccess = await pool.query('SELECT user_id FROM tokens WHERE user_id=$1', [user.rows[0].user_id]);
        
        if(hasAccess.rowCount > 0) {
            await pool.query('UPDATE tokens SET session_id=$1, refreshToken=$2 WHERE user_id=$3', [sessionId, refresh, user.rows[0].user_id]);
        } else {

            const storeRefresh = await pool.query('INSERT INTO tokens (session_id, user_id, refreshToken) VALUES($1,$2,$3) RETURNING session_id', [sessionId, user.rows[0].user_id, refresh]);

            if(!storeRefresh.rows[0]) {
                res.json({
                    error: `Ops.. Server error. Please try again`
                })
            } 

        }
        
        const accessToken = jwt.sign(
        {
            type: 'access',
            user_id: user.rows[0].user_id
        },
        process.env.JWT_SECRET,
        {
            expiresIn: '30m'
        }
        );

        res.cookie('0_0', refresh, { httpOnly: true })

        res.locals.details = { token: accessToken, id: user.rows[0].user_id, email: user.rows[0].email, first_name: user.rows[0].first_name, profile_pic: user.rows[0].profile_pic };

        next();
    }
}