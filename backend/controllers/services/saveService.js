const pool = require('../../utilities/database');

module.exports = {

    // Add like
    save: async (req, res, next) => {
    
    let saves = [];

    const userSaves = await pool.query('SELECT saved_profiles FROM users WHERE user_id=$1', [req.body.logged_in_user])
    
    // check if user has likes
    if(!userSaves.rows[0].saved_profiles || !userSaves.rows[0].saved_profiles.users) {
        saves = { users: [req.body.user_id] }
    } else {
        saves = { users: [req.body.user_id, ...userSaves.rows[0].saved_profiles.users] };
    }

    await pool.query('UPDATE users SET saved_profiles=$1 WHERE user_id=$2', [saves, req.body.logged_in_user])

    next();

    },

    unsave: async (req, res, next) => {

        let saves = [];

        const userSaves = await pool.query('SELECT saved_profiles FROM users WHERE user_id=$1', [req.body.logged_in_user])
        
        //filter user out
        saves = [...userSaves.rows[0].saved_profiles.users].filter(save => {
            return save != req.body.user_id;
        });
    
        const updatedSaves = { users: saves };
    
        await pool.query('UPDATE users SET saved_profiles=$1 WHERE user_id=$2', [updatedSaves, req.body.logged_in_user])
    
        next();
    }

}