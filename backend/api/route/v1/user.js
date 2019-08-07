const express = require('express');
const router = new express.Router();
const { createUserValidator, getUserValidator, getUsersValidator } = require('../middleware/validators/user');
const authMiddleware = require('../middleware/auth');
const UserController = require('../../../controllers/user');
const userController = new UserController();

router.route('/')
.get(authMiddleware(), getUsersValidator, userController.getUsers)
.post(createUserValidator, userController.createUser);

router.route('/:id')
.get(authMiddleware(), getUserValidator, userController.getUser);

module.exports = router;
