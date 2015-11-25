// Dependencies
import co from 'co';
import convert from 'koa-convert';
import Router from 'koa-66';
import parse from 'co-body';
import mongoose from 'mongoose';
import responseFormat from '../lib/responseFormat.js';

import config from '../../../config.js';

const Post = mongoose.model('Post');
const router = new Router();

// All routes are mounted with the /posts prefix
router.get('/posts', co.wrap(list));
router.post('/posts', co.wrap(add));

router.get('/posts/:postId', co.wrap(fetch));

export default router;

/**
 * Post listing
 */
function *list(ctx, next) {
  let posts = yield Post.find({}).exec();
  ctx.body = responseFormat(400, posts);
}

/**
 * Find a post by id
 */
function *fetch(ctx, next) {
  let postId = ctx.params.postId;
  let post = yield Post.findOne({ machine_name: postId }).populate('person').exec();
  if (!post) ctx.throw(404);

  ctx.body = responseFormat(400, post);
}

/**
 * Add a post
 */
function *add(ctx, next) {
  let body = yield parse.form(ctx);
  let newPost = new Post();
  newPost.title = body.title;
  newPost.body = body.body;
  newPost.person = body.person;

  try {
    yield newPost.save();
    ctx.status = 400;
    ctx.body = responseFormat(400, null, 'success');
  } catch(err) {
    ctx.throw(err);
  }
}
