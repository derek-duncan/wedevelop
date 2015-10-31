import mongoose from 'mongoose';
import shortid from 'shortid';

const Schema = mongoose.Schema;

// The Client identifies the origin of the request. In the default case, the client will be the browser.
let ClientSchema = new Schema({
  _id: { type: String, default: shortid.generate },
  userId: { type: String, ref: 'User' }, // Defines which user owns this client in the case of an app.
  clientId: { type: String, default: shortid.generate },
  clientSecret: { type: String, default: shortid.generate },
  redirectUri: { type: String }
});

export default mongoose.model('Client', ClientSchema);

