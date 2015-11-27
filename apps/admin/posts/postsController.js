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
router.get('/posts', co.wrap(list));
router.get('/posts/:postId', co.wrap(fetch));

export default router;

/**
 * Post listing
 */
function *list(ctx, next) {
  let posts = yield Post.find({}).exec();
  ctx.body = yield ctx.render('posts/list', {
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

  ctx.body = yield ctx.render('posts/fetch', {
    post: post
  });
}
