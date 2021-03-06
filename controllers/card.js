const Card = require('../models/card');

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Переданы некорректные данные!' });
        return;
      }
      res.status(500).send({ message: 'Ошибка сервера' });
    });
};

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(404).send({ message: 'Данные не найдены!' });
        return;
      }
      res.status(500).send({ message: 'Ошибка сервера' });
    });
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params._id)
    .orFail(new Error('CastError'))
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.message === 'CastError') {
        res.status(404).send({ message: 'Данные не найдены!' });
        return;
      }
      res.status(500).send({ message: 'Error in delete cards' });
    });
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params._id, { $addToSet: { likes: req.user._id } }, { new: true })
    .orFail(new Error('ValidationError'))
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.message === 'ValidationError') {
        res.status(404).send({ message: 'Отсутствует заданная карточка!' });
        return;
      }
      res.status(500).send({ message: 'Error in like cards' });
    });
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params._id, { $pull: { likes: req.user._id } }, { new: true })
    .orFail(new Error('ValidationError'))
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.message === 'ValidationError') {
        res.status(404).send({ message: 'Отсутствует заданная карточка!' });
        return;
      }
      res.status(500).send({ message: 'Error in like cards' });
    });
};