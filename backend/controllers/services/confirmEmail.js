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

    console.log(url)

/*     const client = new MailtrapClient({ endpoint: ENDPOINT, token: TOKEN });

    const sender = {
        email: "mailtrap@koldfestival.dk",
        name: 'Connected - TEST'
    } */

    var transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "743a3c2239965c",
          pass: "4c9469d57aca59"
        }
      });

        

    
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


        transport.sendMail({
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
            res.locals.info = info
            transport.close();
        })

        
    }
    catch (err) {
        res.json({
        error: err.message
        })
    }
    next();
}