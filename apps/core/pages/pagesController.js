// Dependencies
import co from 'co';
import Router from 'koa-66';
import render from '../lib/render.js';
import config from '../../../config.js';

const router = new Router();

router.get('/', co.wrap(home));

export default router;

function *home(ctx, next) {
  ctx.body = yield render('home');
}
