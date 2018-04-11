/* global api, describe, it, expect, beforeEach */

const Image = require('../../../models/image');
const User = require('../../../models/user');
const jwt = require('jsonwebtoken');
const { secret } = require('../../../config/environment');

const imageData = {
  image: 'image',
  caption: 'caption',
  user: {},
  comments: []
};

const userData = { username: 'test', email: 'test@test.com', password: 'test', passwordConfirmation: 'test' };
let token;

describe('POST /images', () => {
  beforeEach(done => {
    Promise.all([
      User.remove({}),
      Image.remove({})
    ])
      .then(() => User.create(userData))
      .then(user => {
        token = jwt.sign({ sub: user._id }, secret, { expiresIn: '6h' }, () => console.log('token', token));
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
      .send(imageData);
    console.log('imagedata', imageData)
      .expect(201, done);
  });

  it('should return the created image', done => {
    api
      .post('/api/images')
      .set('Authorization', `Bearer ${token}`)
      .send(imageData)
      .end((err, res) => {
        console.log('resbod', res.body);
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
      .send(imageData[0])
      .end((err, res) => {
        expect(res.body.image).to.eq(imageData[0].image);
        expect(res.body.caption).to.eq(imageData[0].caption);
        done();
      });
  });
});
