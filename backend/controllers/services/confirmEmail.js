const pool = require('../../utilities/database');

module.exports = async (req, res, next) => {

    // code to get all users
    const array = ['b47d236c969c49caaded5ccda2297c8c', 'd3c834dc2a2149ad8ff98cbbd4487bbd', 'f6914cb843134e018856cd15f8c7ba8b']
    const parameters = JSON.stringify(array).replace(/[\[\]]+/g, '').replace(/"/g, "'");
    console.log(parameters)
    try {
        const users = await pool.query(`SELECT email, isActive FROM users WHERE user_id IN (${parameters})`);
        res.locals.users = users.rows
    }
    catch (err) {
        res.json({
        error: err.message
        })
    }
    next();
}