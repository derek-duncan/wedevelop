'use strict';

import koa from 'koa';
import compress from 'koa-compress';
import path from 'path';

import postsController from './posts/postsController.js';

const app = koa();

// Routes
app.use(postsController.routes());

// Compress
app.use(compress());

export default app;
