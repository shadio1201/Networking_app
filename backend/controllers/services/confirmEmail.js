require('dotenv').config();
const pool = require('../../utilities/database');
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
const { MailtrapClient } = require('mailtrap');

module.exports = async (req, res, next) => {

    // Confirmation link

    const date = new Date();
    const mail = {
            "id": req.body.id,
            "created": date.toString()
            }
    
    const verification_mail = jwt.sign(mail, process.env.JWT_SECRET, { expiresIn: '1d' });

    const url = process.env.CONFIRMATION_BASEURL + "?id=" + verification_mail;

    const TOKEN = process.env.MAILTRAP_API_TOKEN
    const ENDPOINT = process.env.MAILTRAP_API

    console.log(verification_mail)

    console.log(url)

/*     const client = new MailtrapClient({ endpoint: ENDPOINT, token: TOKEN });

    const sender = {
        email: "mailtrap@koldfestival.dk",
        name: 'Connected - TEST'
    } */

/*     let transporter = nodemailer.createTransport({
        name: "www.net-link.dk",
        host: "live.smtp.mailtrap.io",
        port: 587,
        secure: false,
        auth: {
            user: 'api',
            pass: 'a3d113187c6744ea61c5852f6ebdefbd'
        }}) */

        

    
    try {

/*         const sentMail = await client.send({
            from: sender,
            to: req.body.email,
            subject: 'Please verify your email',
            text: 'Click the link to verify your email' + url,
        });
        
        if(!sentMail.success) {
            console.log(sentMail);
            res.json({
                message: 'Failed to sent email'
            })
        } */


/*         let info = await transporter.sendMail({
            from: 'Connected',
            to: req.body.email,
            subject: "Please verify your email - Connected",
            text: "Click on the link to verify your email: " + url
        }, (error, info) => {
            if(error) {
                console.log(error)
                res.json({error});
            }
            console.log('Email succeesfully sent!');
            console.log(info);
            res.json({ info })
            transporter.close();
        }) */
    }
    catch (err) {
        res.json({
        error: err.message
        })
    }
    next();
}