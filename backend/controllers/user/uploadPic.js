const pool = require('../../utilities/database');
const supabase = require('../../utilities/storage');
const fs = require('fs');

module.exports = async (req, res, next) => {

        try {

            console.log(req.body.image);

            /* const buffer = Buffer.from(req.body.image, "base64");
            const img = fs.writeFileSync(`${req.body.id}.jpg`, buffer);

            const filename = `${req.body.id}-profile-picture`
            const { data, error } = await supabase.storage.from('images').upload(filename, img, {
                cacheControl: 3600,
                upsert: false,
            });

            if(error) {
                res.status(404).json(error);
            } */

            const filepath = req.body.image;
            await pool.query('UPDATE users SET profile_pic=$1 WHERE user_id=$2', [filepath, req.body.id] );
            next();
        }
        catch (err) {
            console.error(err)
            res.json({
            error: err.message
            })
        }

}