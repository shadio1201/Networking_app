const pool = require('../../utilities/database');

module.exports = async (req, res, next) => {

    const userId = req.params.id

    let finalString = []
    let inputs = []

    const updateUser = {
        first_name: null,
        last_name: null,
        profile_pic: null,
        birthday: null,
        titel: null,
        description: null,
        location: null,
        experience: null,
        educations: null,
        skills: null
    }

    const toBeUpdated = { ...updateUser, ...req.body }

    const values = Object.fromEntries(Object.entries(toBeUpdated).filter(([_, v]) => v != null));

    let index = 1;

    for(let x = 0; x < Object.keys(updateUser).length; x++) {
        if(Object.keys(values).includes(Object.keys(updateUser)[x])) {
            finalString.push(`${Object.keys(updateUser)[x]}=$${index}`)
            inputs.push(values[Object.keys(updateUser)[x]]);
            index++
        }
    }

    try {
        await pool.query(`UPDATE users SET ${finalString.join(', ')} WHERE user_id=$${index}`, 
        [...inputs, userId]);
        next();
    }
    catch (err) {
        res.json({
        error: err.message
        })
    }
    
}