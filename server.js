//Author: Brayden Murphy
//CS 361 Microservice

const json2html = require('json-to-html');
const express = require('express');
const app = express();
const { Datastore } = require('@google-cloud/datastore');
const bodyParser = require('body-parser');
const datastore = new Datastore();
const router = express.Router();
app.use(bodyParser.json());
function fromDatastore(item) {
    item.id = item[Datastore.KEY].id;
    return item;
}
app.set('trust proxy', true); 
/* ------------- Begin Lodging Model Functions ------------- */





/* ------------- End Model Functions ------------- */

/* ------------- Begin Controller Functions ------------- */

router.get('/email', function (req, res) {
    res.send("confirmed"); 
});


/* ------------- End Controller Functions ------------- */

app.use('/', router);

// Listen to the App Engine-specified port, or 8080 otherwise
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});