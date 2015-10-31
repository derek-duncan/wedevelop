// Dependencies
import Router from 'koa-router';
import config from '../../../config.js';
import User from './userModel.js';
import authMiddleware from '../auth/authMiddleware.js';

const router = new Router();

router.get('/users', authMiddleware.authenticate(['read:users']), all);
router.get('/users/:user', authMiddleware.authenticate(['read:user']), fetch);
router.post('/users', add);
router.put('/users/:user', modify);
router.delete('/users/:user', remove);

export default router;

function *all(next) {
  let users = yield User.find({}).exec();
  this.body = users;
}

function *fetch(next) {
  let userId = this.params.user;
  let user = yield User.findOne({ _id: userId }).exec();
  if (!user) this.throw(404);
  this.body = user;
}

function *add(next) {
  let user = new User();

  let body = this.request.body;
  user.email = body.email;
  user.password = body.password;
  user.firstname = body.firstname;
  user.lastname = body.lastname;
  user.member_number = body.member_number;

  try {
    yield user.save();
    this.status = 200;
    this.body = 'Successfully added user';
  } catch (err) {
    throw err;
  }
}

function *modify(next) {
  this.body = 'edited a user';
}

function *remove(next) {
  this.body = 'removed a user';
}
