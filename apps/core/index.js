import Koa from 'koa';
import co from 'co';
import convert from 'koa-convert';
import path from 'path';

import pagesController from './pages/pagesController.js';

const app = new Koa();

// Routes
let pagesRoutes = pagesController.routes();
app.use(co.wrap(pagesRoutes));

export default {
  app: app
};
