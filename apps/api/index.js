import koa from 'koa';
import mount from 'koa-mount';
import oauthserver from 'koa-oauth-server';

import env from './env.js';
import OAuthModel from './auth/oauth/oauthModel.js';
import authController from './auth/authController.js';
import clientController from './auth/clients/clientController.js';
import userController from './users/userController.js';

const app = koa();

app.oauth = oauthserver({
  model: OAuthModel,
  grants: ['password', 'authorization_code'],
  debug: true,
  accessTokenLifetime: 60 * 60 * 24
});

// Auth routes
app.use(mount('/oauth', authController(app).routes()));
// Client routes
app.use(clientController(app).routes());
// User routes
app.use(userController.routes());

export default app;
