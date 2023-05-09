const pool = require('../../utilities/database');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid')

module.exports = async (req, res, next) => {

    //if email exist in database

        const checkUsername = await pool.query('SELECT user_id FROM users WHERE username=$1', [req.body.username] );

        if(checkUsername.rowCount > 0) {
            return res.json({ error_type: 'username', error: 'Username is already in use' });
        }


        const checkEmail = await pool.query('SELECT user_id FROM users WHERE email=$1', [req.body.email] );

        if(checkEmail.rowCount > 0) {
            return res.json({ error_type: 'email', error: 'Email is already in use' });
        }



        const user_id = uuidv4().replace(/-/g, '');

        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const USER = [
            user_id,
            req.body.username,
            req.body.email,
            req.body.firstname,
            req.body.lastname,
            hashedPassword,
            req.body.birthday,
        ]
    
    
        try {
            await pool.query('INSERT INTO users (user_id, username, email, first_name, last_name, password, birthday) VALUES($1,$2,$3,$4,$5,$6,$7)', USER );
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