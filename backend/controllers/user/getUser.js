const pool = require('../../utilities/database');

module.exports = async (req, res, next) => {

    const userId = req.params.id

    try {
        const user = await pool.query("SELECT * FROM users WHERE user_id=$1", [userId]);
        res.locals.user = user.rows
    }
    catch (err) {
        res.json({
        error: err.message
        })
    }
    next();
}