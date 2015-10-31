// Models
import User from '../../users/userModel.js';
import Client from '../clients/clientModel.js';
import AccessToken from '../accessTokens/accessTokenModel.js';
import RefreshToken from '../refreshTokens/refreshTokenModel.js';

let model = {};
export default model;

model.getAccessToken = function (bearerToken, callback) {
  console.log(bearerToken);
  AccessToken.findOne({ accessToken: bearerToken }, callback);
};

model.getClient = function (clientId, clientSecret, callback) {
  if (clientSecret === null) {
    return Client.findOne({ clientId: clientId }, callback);
  }
  Client.findOne({ clientId: clientId, clientSecret: clientSecret }, callback);
};

model.grantTypeAllowed = function (clientId, grantType, callback) {
  callback(false, true);
};

model.saveAccessToken = function (token, clientId, expires, userId, callback) {

  var accessToken = new AccessToken({
    accessToken: token,
    clientId: clientId,
    userId: userId,
    expires: expires
  });

  accessToken.save(callback);
};

/*
 * Required to support password grant type
 */
model.getUser = function (email, password, callback) {
  User.findOne({ email: email, password: password }, function(err, user) {
    if (err) return callback(err);
    if (!user) return callback(null, false);
    return callback(null, user._id);
  });
};

/*
 * Required to support refreshToken grant type
 */
model.saveRefreshToken = function (token, clientId, expires, userId, callback) {
  let refreshToken = new RefreshToken({
    refreshToken: token,
    clientId: clientId,
    userId: userId,
    expires: expires
  });

  refreshToken.save(callback);
};

model.getRefreshToken = function (refreshToken, callback) {
  RefreshToken.findOne({ refreshToken: refreshToken }, callback);
};
