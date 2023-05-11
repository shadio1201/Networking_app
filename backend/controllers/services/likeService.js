const pool = require('../../utilities/database');

module.exports = async (req, res, next) => {

    // Add like
    let likes = [];

    const userLikes = await pool.query('SELECT approvals FROM users WHERE user_id=$1', [req.body.user_id])
    
    // check if user has likes
    if(!userLikes.rows[0].approvals || !userLikes.rows[0].approvals.users) {
        likes = { users: [req.body.logged_in_user] }
    } else {
        likes = { users: [...userLikes.rows[0].approvals.users, req.body.logged_in_user] };
    }

    await pool.query('UPDATE users SET approvals=$1 WHERE user_id=$2', [likes, req.body.user_id])

    next();
}