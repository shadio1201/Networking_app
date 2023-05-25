const pool = require('../../utilities/database');

module.exports = async (req, res, next) => {

    const userId = req.params.id

    const information = 'saved_profiles'

    try {
        const user = await pool.query(`SELECT ${information} FROM users WHERE user_id=$1`, [userId]);
        res.locals.user = user.rows
    }
    catch (err) {
        res.json({
        error: err.message
        })
    }
    next();
}