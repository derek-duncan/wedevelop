'use strict';

// Dependencies
import Koa from 'koa';
import logger from 'koa-logger';
import mount from 'koa-mount';
import convert from 'koa-convert';
import co from 'co';
import json from 'koa-json';
import mongoose from 'mongoose';
import path from 'path';

import config from './config.js';

// Sub apps
// import adminApp from './apps/admin';
// import apiApp from './apps/api';
// import blogApp from './apps/blog';
import coreApp from './apps/core';

// Main app
const app = new Koa();

// Connect to mongodb
const connect = () => {
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
app.use(convert(logger()));
app.use(convert(json()));

// Mount sub apps
app.use(mount('/', coreApp));
// app.use(mount('/posts', blogApp));
// app.use(mount('/v1', apiApp));
// app.use(mount('/admin', adminApp));

app.listen(config.koa.port);
console.log(`listening on port ${config.koa.port}`);

export default app;
