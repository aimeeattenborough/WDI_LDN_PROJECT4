const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
mongoose.plugin(require('mongoose-unique-validator'));
mongoose.Promise = require('bluebird');
const errorHandler = require('./lib/errorHandler');

const router = require('./config/router');

const { dbURI, port } = require('./config/environment');


const app = express();
// const port = process.env.PORT || 4000;
app.use(express.static(`${__dirname}/public`));

mongoose.connect(dbURI);
app.use(bodyParser.json());

app.use('/api', router);
app.get('/*', (req, res) => res.sendFile(`${__dirname}/public/index.html`));
app.use(errorHandler);

app.listen(port, () => console.log(`Express running on port ${port}`));

module.exports = app;
