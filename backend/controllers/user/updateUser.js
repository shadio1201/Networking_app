const pool = require('../../utilities/database');

module.exports = async (req, res, next) => {

    const userId = req.params.id

    try {
        await pool.query("UPDATE users SET first_name=$1, last_name=$2, contact_details=$3 WHERE user_id=$4", 
        [req.body.firstname, req.body.lastname, req.body.details, userId]);
    }
    catch (err) {
        res.json({
        error: err.message
        })
    }
    next();
}