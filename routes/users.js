/* eslint-disable object-curly-newline */
const usersRouter = require('express').Router();
const { getUsers, getUser, createUser, updateProfile, updateAvatar } = require('../controllers/user');

usersRouter.get('/users', getUsers);
usersRouter.get('/users/:_id', getUser);
usersRouter.post('/users', createUser);
usersRouter.patch('/users/me', updateProfile);
usersRouter.patch('/users/me/avatar', updateAvatar);

module.exports = usersRouter;