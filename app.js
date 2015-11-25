'use strict';

// Dependencies
import Koa from 'koa';
import logger from 'koa-logger';
import mount from 'koa-mount';
import convert from 'koa-convert';
import co from 'co';
import serve from 'koa-static-cache';
import json from 'koa-json';
import compress from 'koa-compress';
import mongoose from 'mongoose';
import path from 'path';
import fs from 'fs';

import config from './config.js';

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

// Initiate models
let modelsDir = path.join(__dirname, 'common', 'models');
fs.readdirSync(modelsDir).forEach(modelFilename => {
  let modelPath = path.join(modelsDir, modelFilename);
  if (modelFilename.indexOf('.js') >= 0) require(modelPath);
});

// Setup Koa modules
app.use(convert(logger()));
app.use(convert(json()));

// Mount sub apps
// For whatever reason, import doesnt work in this case, so going to the require method.
let coreApp = require('./apps/core').default;
let blogApp = require('./apps/blog').default;
let apiApp = require('./apps/api').default;

app.use(mount('/', coreApp.app));
app.use(mount('/posts', blogApp.app));
app.use(mount('/api/v1', apiApp.app));

// Serve static files
let publicDirectory = path.join(__dirname, 'common', 'public');
let cacheOptions = {
  maxAge: 60 * 60 * 24,
  gzip: true
};
app.use(convert(serve(publicDirectory, cacheOptions)));

app.use(convert(compress()));

app.listen(config.koa.port);
console.log(`listening on port ${config.koa.port}`);

export default app;
