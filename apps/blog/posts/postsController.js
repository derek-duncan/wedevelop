// Dependencies
import Router from 'koa-router';
import koaBody from 'koa-body';
import config from '../../../config.js';
import render from '../lib/render.js';
import Post from './postsModel.js';

const router = new Router();
const bodyParser = koaBody();

// All routes are mounted with the /posts prefix
router.get('/', list);
router.get('/:postId', fetch);
router.post('/', bodyParser, add);

export default router;

/**
 * Post listing
 */
function *list(next) {
  let posts = yield Post.find({}).exec();
  this.body = yield render('list', {
    posts: posts
  });
}

/**
 * Find a post by id
 */
function *fetch(next) {
  let postId = this.params.postId;
  let post = yield Post.findOne({ machine_name: postId }).exec();
  if (!post) this.throw(404);

  this.body = yield render('post', {
    post: post
  });
}

/**
 * Add a post
 */
function *add(next) {
  console.log(this.request.body);
  let body = this.request.body;
  let newPost = new Post();
  newPost.name = body.name;
  try {
    yield newPost.save();
    this.redirect('/');
  } catch(err) {
    this.throw(err);
  }
}
