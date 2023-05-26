const pool = require('../../utilities/database');
const supabase = require('../../utilities/storage');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const sharp = require('sharp');

module.exports = async (req, res, next) => {

        try {
            const img_id = uuidv4();
            let img;
            let base64String = req.body.picture;
            
            // Remove header
            let base64Image = base64String.split(';base64,').pop();

            fs.writeFile(`${req.body.id}-profilepic.png`, base64Image, {encoding: 'base64'}, function(err) {
                console.log('File created');
            });

            await sharp(`./${req.body.id}-profilepic.png`)
            .resize(1024, 1024, {
                fit: 'cover',
                background: {
                    r: 255,
                    g: 255,
                    b: 255,
                    alpha: 0
                }
            })
            .toFile(`${req.body.id}-optimise-profilepic.webp`)

            fs.readFile(`${req.body.id}-optimise-profilepic.webp`, { encoding: '' }, async(err, pictureData) => {
                if(err) return console.log(err, 35)
                const { data, error } = await supabase.storage.from('images').upload(req.body.id + '/' + img_id + '/' + 'profilePicture', pictureData);
                if(error) return console.log(error, 21);
    
                const img_url = `https://isyxtgrylrryhqkxccyb.supabase.co/storage/v1/object/public/images/${data.path}`
                await pool.query('UPDATE users SET profile_pic=$1 WHERE user_id=$2', [img_url, req.body.id] );
            })


            fs.unlink(`${req.body.id}-profilepic.png`, function (err) {
                if (err) return console.log(err, 28);
            });

            fs.unlink(`${req.body.id}-optimise-profilepic.webp`, function (err) {
                if (err) return console.log(err, 28);
            });
            
            next();
        }
        catch (err) {
            console.error(err)
            res.json({
            error: err.message
            })
        }

}