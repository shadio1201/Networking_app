const pool = require('../../utilities/database');

module.exports = async (req, res, next) => {

    // code to get all users
    const currentUser = req.query.id;

    const info = await pool.query(`SELECT saved_profiles FROM users WHERE user_id=$1`, [currentUser]);

    if(!info.rows[0]?.saved_profiles || !info.rows[0].saved_profiles?.users) {
        return res.json({
            error: 'Failed to fetch saved users..'
        })
    }
    
    const selectedUsers = info.rows[0].saved_profiles.users;
    const array = selectedUsers;
    const parameters = JSON.stringify(array).replace(/[\[\]]+/g, '').replace(/"/g, "'");
    try {
        const users = await pool.query(`SELECT first_name, last_name, titel, profile_pic, user_id FROM users WHERE user_id IN (${parameters})`);
        res.locals.users = users.rows

        next();
    }
    catch (err) {
        res.json({
        error: err.message
        })
    }
    
}


