// Dependencies
import Router from 'koa-router';
import config from '../../../config.js';
import koaRequest from 'koa-request';

const router = new Router();
const request = koaRequest.defaults({
  baseUrl: 'http://localhost:3000/v1/'
});

router.get('/', home);

export default router;

function *home(next) {
  let authTokenOptions = {
    url: '/auth/token'
  };
  let authToken = yield request.post(authTokenOptions);
  try {
    authToken = JSON.parse(authToken.body).access_token;
  } catch(err) {
    throw err;
  }

  let options = {
    url: '/users',
    headers: {
      'Authorization': authToken
    }
  };

  let response = yield request(options);
  let users = JSON.parse(response.body);

  yield this.render('home', {
    users: users
  });
}
