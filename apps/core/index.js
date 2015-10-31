import koa from 'koa';
import compress from 'koa-compress';
import serve from 'koa-static';
import path from 'path';

import pagesController from './pages/pagesController.js';

const app = koa();

// Routes
app.use(pagesController.routes());

// Serve static files
app.use(serve(path.join(__dirname, 'public')));

// Compress
app.use(compress());

export default app;
