const fs = require('fs');
const path = require('path');
const cardsRouter = require('express').Router();

const cardsFile = path.join('.', 'data', 'cards.json');

cardsRouter.get('/cards', (req, res) => {
  fs.readFile(cardsFile, { encoding: 'utf8' }, (err, data) => {

    const newData = JSON.parse(data);

    if (err) {
      console.log(err);
      return;
    }

    if (!newData) res.status(404).send({ 'message': 'Запрашиваемый ресурс не найден' });

    res.send(newData);
  });
});

module.exports = cardsRouter;