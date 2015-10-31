// Dependencies
import Router from 'koa-router';
import jwt from 'jsonwebtoken';
import config from '../../../../config.js';

// Models
import Client from './clientModel.js';

// These are mounted with the /oauth prefix
function init(app) {

  const router = new Router();
  router.post('/clients', app.oauth.authorise(), add);
  router.get('/clients/:client_id', app.oauth.authorise(), fetch);

  return router;
}

function *add(next) {
  let client = new Client();

  let body = this.request.body;
  client.redirectUri = body.redirectUri;

  try {
    yield client.save();
    this.status = 200;
    this.body = 'It worked! Nice.';
  } catch(err) {
    this.throw(err);
  }
}

function *fetch(next) {
  let params = this.params;

  try {
    let client = yield Client.findOne({ clientId: params.client_id }).exec();
    if (!client) this.throw(404);
    this.body = client;
  } catch (err) {
    this.throw(err);
  }
}

export default init;
