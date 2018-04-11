const User = require('../models/user');

function indexRoute(req, res, next) {
  User.find()
    .then(users => res.json(users))
    .catch(next);
}

function showRoute(req, res, next) {
  return User.findById(req.params.id)
    .populate('following followers likes')
    .then(user => res.json(user))
    .catch(next);
}

function updateRoute(req, res, next) {
  return User.findById(req.params.id)
    .then(user => Object.assign(user, req.body))
    .then(user => user.save())
    .then(user => res.json(user))
    .catch(next);
}


module.exports = {
  index: indexRoute,
  show: showRoute,
  update: updateRoute
};
