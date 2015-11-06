// Dependencies
import co from 'co';
import Router from 'koa-66';
import render from '../lib/render.js';
import mqttClient from '../lib/mqttClient.js';

const client = mqttClient();

function pagesController(app) {
  const router = new Router();

  router.get('/', co.wrap(home));

  return router;
}

export default pagesController;

function *home(ctx, next) {
  client.publish('core', 'get:home');
  ctx.body = yield render('home');
}
