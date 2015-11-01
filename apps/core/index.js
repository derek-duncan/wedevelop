import Koa from 'koa';
import co from 'co';
import convert from 'koa-convert';
import compress from 'koa-compress';
import serve from 'koa-static';
import path from 'path';

import pagesController from './pages/pagesController.js';

const app = new Koa();

// Routes
app.use(convert(pagesController.routes()));

// // Serve static files
app.use(convert((serve(path.join(__dirname, 'public')))));

// Compress
app.use(convert(compress()));

export default app;
