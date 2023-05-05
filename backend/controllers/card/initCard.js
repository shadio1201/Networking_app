const pool = require('../../utilities/database');
const { v4: uuidv4 } = require('uuid')

module.exports = async (req, res, next) => {

    const card_id = uuidv4().replace(/-/g, '');

    const USER = [
        card_id,
        req.body.user_id,
        true
    ]


    try {
        await pool.query('INSERT INTO cards (card_id, user_id, is_locked) VALUES($1,$2,$3)', USER );
        next();
    }
    catch (err) {
        console.error(err)
        res.json({
        error: err.message
        })
    }
}