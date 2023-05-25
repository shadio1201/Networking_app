const pool = require('../../utilities/database');
const supabase = require('../../utilities/storage');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

module.exports = async (req, res, next) => {

        try {
            const img_id = uuidv4();
            let base64String = req.body.picture;
            
            // Remove header
            let base64Image = base64String.split(';base64,').pop();

            fs.writeFile(`${req.body.id}-profilepic.png`, base64Image, {encoding: 'base64'}, function(err) {
                console.log('File created');
            });

            fs.readFile(`${req.body.id}-profilepic.png`, async function(err, data1) {
                if(err) return console.log('Failed')
                const { data, error} = await supabase.storage.from('images').upload(req.body.id + '/' + img_id + '/' + 'profilePicture', data1);
                if(error) return console.log(error, 21);

                const img_url = `https://isyxtgrylrryhqkxccyb.supabase.co/storage/v1/object/public/images/${data.path}`
                await pool.query('UPDATE users SET profile_pic=$1 WHERE user_id=$2', [img_url, req.body.id] );
            });

            fs.unlink(`${req.body.id}-profilepic.png`, function (err) {
                if (err) return console.log(err, 28);
                console.log('File deleted!');
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