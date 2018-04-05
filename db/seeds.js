const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const Image = require('../models/image');
const User = require('../models/user');
const userData = require('./data/user');
const imageData = require('./data/images');

const { dbURI } = require('../config/environment');

mongoose.connect(dbURI, (err, db) => {
  db.dropDatabase();
  Image.create(imageData)
    .then(images => {
      console.log(images);
      console.log(`${images.length} images created`)
    })
    .catch(err => console.log(err))
    .finally(() => mongoose.connection.close());

  User.create(userData)
    .then(user => console.log(`${user.length} users created`))
    .catch(err => console.log(err))
    .finally(() => mongoose.connection.close());
});
