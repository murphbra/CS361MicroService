//Author: Brayden Murphy
//CS 361 Microservice
//sources cited: this code draws from tutorial provided at: 
//https://www.freecodecamp.org/news/use-nodemailer-to-send-emails-from-your-node-js-server/
//https://www.npmjs.com/package/dotenv
//

const dotenv = require('dotenv').config(); 
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const router = express.Router();
app.use(bodyParser.json());
const nodeMailer = require('nodemailer'); 
const { google } = require('googleapis'); 
app.set('trust proxy', true); 
/* ------------- Begin Nodemailer Functions ------------- */
let transporter = nodeMailer.createTransport({
    service: 'gmail',
    auth: {
        type: 'OAuth2',
        user: "cs361microservicebraydenmurphy@gmail.com",
        clientId: "1043862098383-3ksheja8ochdubre3joccgkfs5bkmlm3.apps.googleusercontent.com",
        clientSecret: "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",
        refreshToken: "1//04sOTLPAx6bymCgYIARAAGAQSNwF-L9IrcvMcT8A464SVYRN1m-MZRk634NDusc0Us8KIL74CAQ3_6PRf5zXW3C10Ed6ZiQ25BXc", 
        accessToken: "ya29.a0ARrdaM9iEjX9StTaUmUgIj901hNg_eyIW1pqNSwTSGt9NvZTPeNRT7DgZIFsBdHb9e8fL-wo-9FAiEpxXliPxZDTuSQvz1HuyCJECb8V1b04n9SokLr16_9b31WjipazW0Ik5_YauphANQL2TjGKJVUhbc02"
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

    if(req.body.from === undefined)
    {
        res.status(400).json({'Error': 'The request object is missing the from attribute.'}).end(); 
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
        from: "cs361microservicebraydenmurphy@gmail.com", 
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