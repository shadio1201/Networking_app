const pool = require('../../utilities/database');

module.exports = async (req, res, next) => {

    // code to get all users

    try {
        const users = await pool.query('SELECT * FROM users');
        res.locals.users = users.rows
    }
    catch (err) {
        res.json({
        error: err.message
        })
    }
    next();
}


