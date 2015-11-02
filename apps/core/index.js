import Koa from 'koa';
import co from 'co';
import convert from 'koa-convert';
import serve from 'koa-static';
import path from 'path';

import pagesController from './pages/pagesController.js';

const app = new Koa();

// Routes
let pagesRoutes = pagesController.routes();
app.use(co.wrap(pagesRoutes));

// Serve static files
let publicDirectory = path.join(__dirname, 'public');
app.use(convert(serve(publicDirectory)));

export default app;
