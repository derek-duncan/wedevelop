// Dependencies
import co from 'co';
import path from 'path';
import convert from 'koa-convert';
import Router from 'koa-66';
import parse from 'co-body';
import mongoose from 'mongoose';

import config from '../../../config.js';

const Post = mongoose.model('Post');
const router = new Router();

// All routes are mounted with the /posts prefix
router.get('/', co.wrap(home));
router.get('/:postId', co.wrap(fetch));

export default router;

/**
 * Home listing
 */
function *home(ctx, next) {
  let posts = yield Post.find({}).sort('-created_at').limit(1).exec();
  ctx.body = yield ctx.render('home', {
    posts: posts
  });
}

/**
 * Post listing
 */
function *list(ctx, next) {
  let posts = yield Post.find({}).sort('-created_at').exec();
  ctx.body = yield ctx.render('list', {
    posts: posts
  });
}

/**
 * Find a post by id
 */
function *fetch(ctx, next) {
  let postId = ctx.params.postId;
  // find post by machine_name or _id for more flexible linking
  let post = yield Post.findOne({ $or: [ { machine_name: postId }, { _id: postId } ] }).exec();
  if (!post) ctx.throw(404);

  ctx.body = yield ctx.render('post', {
    post: post
  });
}
