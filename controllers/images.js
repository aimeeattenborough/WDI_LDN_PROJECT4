const Image = require('../models/image');

// IMAGES

function indexRoute(req, res, next) {
  Image
    .find()
    .populate('user comments.user')
    .then(images => {
      res.json(images);
    })
    .catch(next);
}

function createRoute(req, res, next) {
  req.body.user = req.currentUser;
  return Image.create(req.body)
    .then(image => res.status(201).json(image))
    .catch(next);
}

function showRoute(req, res, next) {
  return Image.findById(req.params.id)
    .then(image => res.json(image))
    .catch(next);
}

function updateRoute(req, res, next) {
  return Image.findById(req.params.id)
    .then(image => Object.assign(image, req.body))
    .then(image => image.save())
    .then(image => res.json(image))
    .catch(next);
}

function deleteRoute(req, res, next) {
  return Image.findById(req.params.id)
    .then(image => image.remove())
    .then(() => res.sendStatus(204))
    .catch(next);
}

// COMMENTS

function commentsCreateRoute(req, res, next) {
  req.body.user = req.currentUser;
  Image
    .findById(req.params.id)
    .then(image => {
      image.comments.push(req.body);
      return image.save();
    })
    .then(image => Image.populate(image, { path: 'comments.user' }))
    .then(image => res.json(image))
    .catch(next);
}

function commentsDeleteRoute(req, res, next) {
  Image.findById(req.params.id) //gets the image
    .then(image => {
      const comment = image.comments.id(req.params.commentId); // id is find the comment by id, so that will give me the comment in the const.
      comment.remove();
      return image.save();
    })
    .then(image => res.json(image))
    .catch(next);
}

// LIKES

function likesCreateRoute(req, res, next) {
  if(req.currentUser.likes.find(image => image.equals(req.params.id))) return false;
  // checking whether the current likes array contains the same image id - if so cannot add again. image is a string, req.params an obj so using equals
  req.currentUser.likes.push(req.params.id);
  req.currentUser.save()
    .then(user => res.json(user))
    .catch(next);
}

function likesDeleteRoute(req, res, next) {
  req.currentUser.likes = req.currentUser.likes.filter(image => !image.equals(req.params.id));
  // filter returns new array so saving it as likes.
  req.currentUser.save()
    .then(user => res.json(user))
    .catch(next);
}
// DISLIKES

function dislikesCreateRoute(req, res, next) {
  console.log('hitting route');
  if(req.currentUser.dislikes.find(image => image.equals(req.params.id))) return false;
  // checking whether the current dislikes array contains the same image id - if so cannot add again. image is a string, req.params an obj so using equals
  console.log('adding dislike');
  req.currentUser.dislikes.push(req.params.id);
  console.log(req.currentUser);
  req.currentUser.save()
    .then(user => res.json(user))
    .catch(next);
}

function dislikesDeleteRoute(req, res, next) {
  req.currentUser.dislikes = req.currentUser.dislikes.filter(image => !image.equals(req.params.id));
  // filter returns new array so saving it as dislikes.
  req.currentUser.save()
    .then(user => res.json(user))
    .catch(next);
}



module.exports = {
  index: indexRoute,
  create: createRoute,
  show: showRoute,
  update: updateRoute,
  delete: deleteRoute,
  commentsCreate: commentsCreateRoute,
  commentsDelete: commentsDeleteRoute,
  likesCreate: likesCreateRoute,
  likesDelete: likesDeleteRoute,
  dislikesCreate: dislikesCreateRoute,
  dislikesDelete: dislikesDeleteRoute
};
