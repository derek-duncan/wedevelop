'use strict';

import Koa from 'koa';
import co from 'co';
import convert from 'koa-convert';
import serve from 'koa-static';
import path from 'path';

import postsController from './posts/postsController.js';

const app = new Koa();

// Routes
let postsRoutes = postsController.routes();
app.use(co.wrap(postsRoutes));

// Serve static files
let publicDirectory = path.join(__dirname, 'public');
app.use(convert(serve(publicDirectory)));

export default app;
