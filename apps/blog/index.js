'use strict';

import Koa from 'koa';
import co from 'co';
import convert from 'koa-convert';
import serve from 'koa-static-cache';
import path from 'path';

import postsController from './posts/postsController.js';

const app = new Koa();

// Routes
let postsRoutes = postsController.routes();
app.use(co.wrap(postsRoutes));

// Serve static files
let publicDirectory = path.join(__dirname, 'public');
let cacheOptions = {
  maxAge: 60 * 60 * 24,
  gzip: true
};
app.use(convert(serve(publicDirectory, cacheOptions)));

export default app;
