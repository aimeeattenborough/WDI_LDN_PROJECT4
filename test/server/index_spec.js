/* global api, describe, it, expect, beforeEach */

const Image = require('../../models/image');
const User = require('../../models/user');

const imageData = [{
  image: 'image',
  caption: 'caption',
  comments: []
}];

describe('GET /images', () => {
  beforeEach(done => {
    Promise.all([
      User.remove({}),
      Image.remove({})
    ])
      .then(() => Image.create(imageData))
      .then(() => done());
  });

  it('should return a 200 response', done => {
    api
      .get('/api/images')
      .expect(200, done);
  });

  it('should return an array of images', done => {
    api
      .get('/api/images')
      .end((err, res) => {
        expect(res.body).to.be.an('array');
        res.body.forEach(image => {
          expect(image).to.include.keys([
            'image',
            'caption'
          ]);
        });
        done();
      });
  });

  it('should return the correct data', done => {
    api
      .get('/api/images')
      .end((err, res) => {
        res.body = res.body.sort((a, b) => a.name > b.name);
        res.body.forEach((image, i) => {
          expect(image.image).to.eq(imageData[i].image);
          expect(image.caption).to.eq(imageData[i].caption);
        });
        done();
      });
  });
});
