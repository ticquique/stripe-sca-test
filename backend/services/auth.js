const env = require('../env');
const jwt = require('jsonwebtoken');
class AuthService {

  createToken(user) {
    const today = new Date();
    const payload = {
      iss: env.app_domain,
      sub: user._id,
      iat: today.getTime(),
      email: user.email,
      name: user.name,
      exp: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7).getTime(),
    };
    const secretOrKey = env.api_secret;
    const token = jwt.sign(payload, secretOrKey, { algorithm: 'HS256' });
    return token;
  }

  async validateToken(token) {
    if (typeof token !== 'string') throw Error('Invalid token provided');
    const parts = token.split(' ');
    if (parts.length !== 2) throw Error('Invalid credentials');
    const scheme = parts[0];
    let credentials = parts[1];
    if (credentials.startsWith('"')) credentials = credentials.substring(1);
    if (credentials.endsWith('"')) credentials = credentials.substring(0, credentials.length - 1);
    if (!/^Bearer$/i.test(scheme)) throw Error('Format is Authorization: Bearer [token]');
    const decoded = await jwt.verify(credentials, env.api_secret, { algorithms: ['HS256'] });
    if (env.revoqued_tokens.indexOf(decoded.sub) > -1) throw Error('User banned for some reason, check your email');
    return decoded;
  }

}

module.exports = AuthService;
