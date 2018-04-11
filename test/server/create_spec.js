/* global api, describe, it, expect, beforeEach */

const Image = require('../../models/image');
const User = require('../../models/user');
const jwt = require('jsonwebtoken');
const { secret } = require('../../config/environment');

const imageData = {
  image: 'image',
  caption: 'caption'
};

const userData = {
  username: 'user1',
  email: 'user1@user1.com',
  password: 'password',
  passwordConfirmation: 'password',
  profilePicture: 'https://www.gamedevmarket.net/inc/uploads/Chicken_sombrero.gif',
  isUnfluencer: false
};
let token;
let user;

describe('POST /images', () => {
  beforeEach(done => {
    Promise.props([
      User.remove({}),
      Image.remove({})
    ])
      .then(() => User.create(userData))
      .then(_user => {
        user = _user;
        token = jwt.sign({ sub: user._id }, secret, { expiresIn: '6h' });
      })
      .then(done);
  });

  it('should return a 401 response', done => {
    api
      .post('/api/images')
      .send(imageData)
      .expect(401, done);
  });

  it('should return a 201 response with a token', done => {
    api
      .post('/api/images')
      .set('Authorization', `Bearer ${token}`)
      .send(imageData)
      .expect(201, done);
  });

  it('should return the created image', done => {
    api
      .post('/api/images')
      .set('Authorization', `Bearer ${token}`)
      .send(imageData)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body).to.include.keys([
          'image',
          'caption',
          'user',
          'comments'
        ]);
        done();
      });
  });

  it('should return the correct data', done => {
    api
      .post('/api/images')
      .set('Authorization', `Bearer ${token}`)
      .send(imageData)
      .end((err, res) => {
        console.log(res.body);
        expect(res.body.image).to.eq(imageData.image);
        expect(res.body.caption).to.eq(imageData.caption);
        done();
      });
  });
});
