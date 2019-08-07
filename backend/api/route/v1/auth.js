const express = require('express');
const router = new express.Router();
const { getTokenValidator } = require('../middleware/validators/auth');
const UserService = require('../../../services/user');
const AuthService = require('../../../services/auth');
const authService = new AuthService();
const userService = new UserService();

/**
 * Generate token to authentication
 */
const getToken = async(req, res, next) => {
  const { username, password } = req.body;
  let user = await userService.find(1, 1, { username }, null, null, '+password');
  if (!user.length) throw Error('User not found');
  user = user[0];
  if (!user.comparePassword(password)) throw Error('Incorrect password');
  res.status(200).json(authService.createToken(user));
  next();
};

router.route('/')
.post(getTokenValidator, getToken);

module.exports = router;
