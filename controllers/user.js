const User = require('../models/user');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch((err) => {
      if (err.name === 'CastError') res.status(404).send({ message: 'Данные не найдены!' });
      res.status(500).send({ message: 'Ошибка сервера' });
    });
};

module.exports.getUser = (req, res) => {
  User.findById(req.params._id)
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'CastError') res.status(404).send({ message: 'Данные не найдены!' });
      res.status(500).send({ message: 'Ошибка сервера' });
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((newUser) => res.send(newUser))
    .catch((err) => {
      if (err.name === 'ValidationError') res.status(400).send({ message: 'Переданы некорректные данные!' });
      res.status(500).send({ message: 'Ошибка сервера' });
    });
};

module.exports.updateProfile = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => res.send(user))
    .catch(() => res.status(500).send({ message: 'Error in update user' }));
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => res.send(user))
    .catch(() => res.status(500).send({ message: 'Error in avatar user' }));
};