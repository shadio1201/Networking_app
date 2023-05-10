require('dotenv').config();
const pool = require('../../utilities/database');
const jwt = require("jsonwebtoken")

module.exports = async (req, res, next) => {

    const { token } = req.body;

    const user_token = jwt.verify(token, process.env.JWT_SECRET);

    if(!user_token) {
        return res.json({
            expired: `Authentication has expired,
            Please signin again`
        })
    }

    const user = await pool.query(`SELECT email, first_name, profile_pic, user_id, isActive FROM users WHERE user_id=$1`, [user_token.user_id]);

    if(user.rowCount === 0) {
        return res.json({
            error: "No user found",
        });
    } else {
        if(!user.rows[0].isactive) {
            return res.json({
                error: "Account not verified",
            });
        }

        res.locals.currentUser = { id: user.rows[0].user_id, email: user.rows[0].email, first_name: user.rows[0].first_name, profile_pic: user.rows[0].profile_pic  }
    }
    
    
    
    next();
}
