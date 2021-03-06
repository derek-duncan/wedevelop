'use strict';

import Koa from 'koa';
import co from 'co';
import convert from 'koa-convert';

import postsController from './posts/postsController.js';
import personsController from './persons/personsController.js';

const app = new Koa();

// Routes
let postsRoutes = postsController.routes();
app.use(co.wrap(postsRoutes));

let personsRoutes = personsController.routes();
app.use(co.wrap(personsRoutes));

export default {
  app: app
};
