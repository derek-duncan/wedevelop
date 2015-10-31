// Dependencies
import Router from 'koa-router';
import jwt from 'jsonwebtoken';
import config from '../../../config.js';

// These are mounted with the /oauth prefix
function init(app) {

  const router = new Router();
  router.post('/token', app.oauth.grant());

  return router;
}

export default init;
