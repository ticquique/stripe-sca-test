const AuthService = require('../../../services/auth');
const authService = new AuthService();

/**
 * Middleware for authentication
 * @param {string} level Level of authentication needed to process the request
 */
const authMiddleware = (level = 'basic') => async(req, res, next) => {
  try {
    if (!level === 'basic') throw Error('Permission denied');
    if (!(req.headers && req.get('authorization'))) throw Error('Log in to continue');
    res.locals.user = await authService.validateToken(req.get('authorization'));
    next();
  } catch (e) {
    next(e);
  }
};

module.exports = authMiddleware;
