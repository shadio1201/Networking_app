const pool = require('../../utilities/database');

module.exports = async (req, res, next) => {


    // remove like
    let likes = [];

    const userLikes = await pool.query('SELECT approvals FROM users WHERE user_id=$1', [req.body.user_id])
    
    //filter user out
    likes = [...userLikes.rows[0].approvals.users].filter(like => {
        return like != req.body.logged_in_user;
    });

    const newCount = { users: likes };

    await pool.query('UPDATE users SET approvals=$1 WHERE user_id=$2', [newCount, req.body.user_id])

    next();
}