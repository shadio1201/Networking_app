const pool = require('../../utilities/database');
const supabase = require('../../utilities/storage');
const { v4: uuidv4 } = require('uuid')

module.exports = async (req, res, next) => {

    //if email exist in database
    const user = await pool.query('SELECT user_id FROM users WHERE email=$1', [req.body.email] );

    if(!user[0]) {
        const user_id = uuidv4().replace(/-/g, '');

        const USER = [
            user_id,
            req.body.email,
            req.body.firstname,
            req.body.lastname,
            req.body.password,
            req.body.birthday,
        ]
    
    
        try {
            await pool.query('INSERT INTO users (user_id, email, first_name, last_name, password, birthday) VALUES($1,$2,$3,$4,$5,$6)', USER );
            res.locals.id = user_id;
            next();
        }
        catch (err) {
            console.error(err)
            res.json({
            error: err.message
            })
        }
    }
    else {
        res.json({
            err: 'Email is already created. Please use a different email.'
        })
    }

}