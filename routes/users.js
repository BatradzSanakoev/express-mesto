const fs = require('fs');
const path = require('path');
const usersRouter = require('express').Router();

const usersFile = path.join('.', 'data', 'users.json');

usersRouter.get('/users', (req, res) => {
  fs.readFile(usersFile, { encoding: 'utf8' }, (err, data) => {

    const newData = JSON.parse(data);

    if (err) {
      console.log(err);
      return;
    }

    if (!newData) res.status(404).send({ 'message': 'Запрашиваемый ресурс не найден' });

    res.send(newData);
  });
});

usersRouter.get('/users/:_id', (req, res) => {
  fs.readFile(usersFile, { encoding: 'utf8' }, (err, data) => {

    const newData = JSON.parse(data);

    if (err) {
      console.log(err);
      return;
    }

    const user = newData.find(data => data._id === req.params._id);

    if (!user) {
      res.status(404).send({ 'message': 'Нет пользователя с таким id' });
      return;
    }

    res.send(user);
  });
});

module.exports = usersRouter;