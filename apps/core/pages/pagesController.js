// Dependencies
import co from 'co';
import path from 'path';
import Router from 'koa-66';
import config from '../../../config.js';

const router = new Router();

router.get('/', co.wrap(home));

export default router;

function *home(ctx, next) {
  ctx.body = yield ctx.render('home');
}
