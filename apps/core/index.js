import Koa from 'koa';
import co from 'co';
import convert from 'koa-convert';
import path from 'path';
import createRender from '../../common/lib/render.js';

const render = createRender(path.join(__dirname, 'views'));

import pagesController from './pages/pagesController.js';

const app = new Koa();

app.use(co.wrap(function* (ctx, next) {
  // Custom, app-wide functions here
  ctx.render = render;

  yield next();
}));

// Routes
let pagesRoutes = pagesController.routes();
app.use(co.wrap(pagesRoutes));

export default {
  app: app
};
