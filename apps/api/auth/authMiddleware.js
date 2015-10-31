// Dependencies
import jwt from 'jsonwebtoken';
import config from '../../../config.js';

export default {
  authenticate: authenticate
};

function authenticate(scopes) {
  return function*(next) {
    let ctx = this;
    let authorizationToken = ctx.request.headers.authorization;
    if (!authorizationToken) {
      ctx.status = 401;
      return;
    }
    let decoded;
    try {
      decoded = jwt.verify(authorizationToken, process.env.JWT_SECRET);
    } catch(err) {
      ctx.status = 401;
      ctx.body = 'Invalid token';
      return;
    }
    try {
      let authenticated = true;
      scopes.forEach(scope => {
        if (!decoded.scopes.includes(scope)) {
          authenticated = false;
        }
      });
      if (authenticated) {
        return yield next;
      } else {
        ctx.status = 401;
        return;
      }
    } catch(err) {
      throw err;
    }
  };
}
