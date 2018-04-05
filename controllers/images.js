const Image = require('../models/image');

// IMAGES

function indexRoute(req, res, next) {
  Image
    .find()
    .then(images => {
      console.log(images);
      res.json(images);
    })
    .catch(next);
}

function createRoute(req, res, next) {
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

  Image.findById(req.params.id) //gets the image
    .then(image => {
      image.comments.push(req.body);
      return image.save();
    })
    .then(image => res.redirect(`/images/${image._id}`))
    .catch(next);
}

function commentsDeleteRoute(req, res, next) {
  Image.findById(req.params.id) //gets the image
    .then(image => {
      const comment = image.comments.id(req.params.commentId); // id is find the comment by id, so that will give me the comment in the const.
      comment.remove();
      return image.save();
    })
    .then(image => res.redirect(`/images/${image._id}`))
    .catch(next);
}

// LIKES

function likesCreateRoute(req, res, next) {
  req.currentUser.likes.push(req.params.id);
  req.currentUser.save()
    .then(() => res.redirect(`/images/${req.params.id}`))
    .catch(next);
}
// 'save new filtered array as locals.currentUser.likes' = likes;

function likesDeleteRoute(req, res, next) {
  req.currentUser.likes = req.currentUser.likes.filter(image => {
    return !image._id.equals(req.params.id);
  });
  req.currentUser.save()
    .then(() => res.redirect(`/images/${req.params.id}`))
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
  likesDelete: likesDeleteRoute
};
