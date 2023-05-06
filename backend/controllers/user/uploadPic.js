const pool = require('../../utilities/database');
const supabase = require('../../utilities/storage');

module.exports = async (req, res, next) => {

        try {
            const image = req.body.image;
            await supabase.storage.from('images').upload(`profiles/${req.body.id}-profilePic.png`, image);

            const { publicURL, error } = supabase.storage.from('images').getPublicUrl('profiles/${req.body.id}-profilePic.png');

            await pool.query('UPDATE users SET profile_pic=$1 WHERE user_id=$2', [publicURL, req.body.id] );
            next();
        }
        catch (err) {
            console.error(err)
            res.json({
            error: err.message
            })
        }

}