//Author: Brayden Murphy
//CS 361 Microservice
//sources cited: this code draws from tutorial provided at: 
//https://www.freecodecamp.org/news/use-nodemailer-to-send-emails-from-your-node-js-server/
//https://www.npmjs.com/package/dotenv

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const router = express.Router();
const cors = require('cors'); 
app.use(bodyParser.json());
app.use(cors()); 
const nodeMailer = require('nodemailer'); 
require('dotenv').config(); 
/* ------------- Begin Nodemailer Functions ------------- */
let transporter = nodeMailer.createTransport({
    service: 'gmail',
    auth: {
        type: 'OAuth2',
        user: process.env.MAIL_USERNAME,
        clientId: process.env.OAUTH_CLIENTID,
        clientSecret: process.env.OAUTH_CLIENT_SECRET,
        refreshToken: process.env.OAUTH_REFRESH_TOKEN, 
        accessToken: process.env.OAUTH_ACCESS_TOKEN
    }
}); 


/* ------------- End Nodemailer Functions ------------- */

/* ------------- Begin Controller Functions ------------- */

router.put('/email', function (req, res){
    res.set('Accept', 'POST');
    res.status(405).end();
});

router.get('/email', function (req, res){
    res.set('Accept', 'POST');
    res.status(405).end(); 
});

router.patch('/email', function (req, res){
    res.set('Accept', 'POST');
    res.status(405).end();
});

router.post('/email', function (req, res){
    if(req.get('content-type') !== 'application/json'){
        res.status(415).json({'Error': 'Server only accepts application/json data.'}).end(); 
        return; 
    }

    if(req.body.to === undefined)
    {
        res.status(400).json({'Error': 'The request object is missing the to attribute.'}).end(); 
    }
    if(req.body.subject === undefined)
    {
        res.status(400).json({'Error': 'The request object is missing the subject attribute.'}).end(); 
    }
    if(req.body.text === undefined)
    {
        res.status(400).json({'Error': 'The request object is missing the text attribute.'}).end(); 
    }
    let mailOptions = {
        from: process.env.MAIL_USERNAME, 
        to: req.body.to,
        subject: req.body.subject,
        text: req.body.text
    };
    transporter.sendMail(mailOptions, function(err, data){
        if (err) {
            res.status(400).json({'Error': "Error is: " + err}); 
        } else {
            res.status(200).end(); 
        }
    })
}); 


/* ------------- End Controller Functions ------------- */

app.use('/', router);

// Listen to the App Engine-specified port, or 8080 otherwise
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});