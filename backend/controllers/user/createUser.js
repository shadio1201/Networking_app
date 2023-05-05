const pool = require('../../utilities/database');
const supabase = require('../../utilities/storage');
const { v4: uuidv4 } = require('uuid')

module.exports = async (req, res, next) => {

    const user_id = uuidv4().replace(/-/g, '');

    const USER = [
        user_id,
        req.body.email,
        req.body.firstname,
        req.body.lastname,
        req.body.password,
        req.body.birthday,
        req.body.details,
        req.body.card_id
    ]


    try {
        await pool.query('INSERT INTO users (user_id, email, first_name, last_name, password, birthday, contact_details, card_key) VALUES($1,$2,$3,$4,$5,$6,$7,$8)', USER );
        next();
    }
    catch (err) {
        console.error(err)
        res.json({
        error: err.message
        })
    }
}