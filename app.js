'use strict';

// Dependencies
import koa from 'koa';
import logger from 'koa-logger';
import mount from 'koa-mount';
import json from 'koa-json';
import bodyparser from 'koa-bodyparser';
import mongoose from 'mongoose';
import path from 'path';

import config from './config.js';

// Sub apps
import adminApp from './apps/admin';
import apiApp from './apps/api';
import coreApp from './apps/core';
import blogApp from './apps/blog';

// Main app
const app = koa();

// Connect to mongodb
const connect = function () {
  const options = {
    server: {
      socketOptions: {
        keepAlive: 1
      }
    }
  };
  mongoose.connect(config.mongodb.url, options);
};
connect();
mongoose.connection.on('error', console.log);
mongoose.connection.on('disconnected', connect);

// Setup Koa modules
app.use(logger());
app.use(bodyparser());
app.use(json());

// Mount sub apps
app.use(mount('/', coreApp));
app.use(mount('/posts', blogApp));
app.use(mount('/v1', apiApp));
app.use(mount('/admin', adminApp));

app.listen(config.koa.port);
console.log(`listening on port ${config.koa.port}`);

export default app;
