require('dotenv').config();
const pool = require('../../utilities/database');
const jwt = require("jsonwebtoken")

module.exports = async (req, res, next) => {

    const refresh_token = req.cookies['0_0']

    const isTokenActive = await pool.query(`SELECT session_id, user_id FROM tokens WHERE refreshToken=$1`, [refresh_token]);

    if(isTokenActive.rowCount === 0) {
        res.cookie('0_0', '');
        return res.json({
            noToken: true,
            error: "Not logged in",
        });
    }

    const user_token = jwt.verify(refresh_token, process.env.JWT_REFRESH);

    if(!user_token) {

        await pool.query(`DELETE FROM tokens WHERE refreshToken=$1`, [refresh_token]);

        return res.json({
            error: `Authentication has expired,
            Please signin again`
        })
    }

    if(isTokenActive.rows[0].session_id != user_token.sessionId) {
        res.cookie('0_0', '');
        return res.json({
            error: "Credentials invalid",
        })
    }

    const user = await pool.query(`SELECT email, first_name, profile_pic, user_id, isActive FROM users WHERE user_id=$1`, [isTokenActive.rows[0].user_id]);

    if(user.rowCount === 0) {
        res.cookie('0_0', '');
        return res.json({
            error: "No user found",
        });
    } else {
        
        const accessToken = jwt.sign(
            {
                type: 'access',
                user_id: user.user_id
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '30m'
            }
        );

        res.locals.currentUser = { token: accessToken, id: user.rows[0].user_id, email: user.rows[0].email, first_name: user.rows[0].first_name, profile_pic: user.rows[0].profile_pic  }
    }
    
    
    
    next();
}
