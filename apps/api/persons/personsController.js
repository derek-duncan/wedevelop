// Dependencies
import co from 'co';
import convert from 'koa-convert';
import Router from 'koa-66';
import parse from 'co-body';
import mongoose from 'mongoose';
import responseFormat from '../lib/responseFormat.js';

import config from '../../../config.js';

const Person = mongoose.model('Person');
const router = new Router();

// All routes are mounted with the /persons prefix
router.get('/persons', co.wrap(list));
router.post('/persons', co.wrap(add));

router.get('/persons/:personId', co.wrap(fetch));

export default router;

/**
 * Person listing
 */
function *list(ctx, next) {
  let persons = yield Person.find({}).exec();
  ctx.body = responseFormat(400, persons);
}

/**
 * Find a post by id
 */
function *fetch(ctx, next) {
  let personId = ctx.params.personId;
  let person = yield Person.findOne({ _id: personId }).exec();
  if (!person) ctx.throw(404);

  ctx.body = responseFormat(400, person);
}

/**
 * Add a post
 */
function *add(ctx, next) {
  let body = yield parse.form(ctx);
  let newPost = new Person();
  newPost.title = body.title;
  newPost.body = body.body;
  try {
    yield newPost.save();
    ctx.status = 400;
    ctx.body = responseFormat(400, null, 'success');
  } catch(err) {
    ctx.throw(err);
  }
}
