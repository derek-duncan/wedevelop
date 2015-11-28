'use strict';

import Koa from 'koa';
import co from 'co';
import convert from 'koa-convert';
import path from 'path';
import createRender from '../../common/lib/render.js';

const render = createRender(path.join(__dirname, 'views'));

import postsController from './posts/postsController.js';
import personsController from './persons/personsController.js';

const app = new Koa();

app.use(co.wrap(function* (ctx, next) {
  // Custom, app-wide functions here
  ctx.render = render;

  yield next();
}));

// Routes
let postsRoutes = postsController.routes();
app.use(co.wrap(postsRoutes));

let personsRoutes = personsController.routes();
app.use(co.wrap(personsRoutes));

export default {
  app: app
};
