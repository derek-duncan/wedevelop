import mongoose from 'mongoose';
const Schema = mongoose.Schema;

//
// Schemas definitions
//
var AccessTokenSchema = new Schema({
  accessToken: { type: String },
  clientId: { type: String },
  userId: { type: String, ref: 'User' },
  expires: { type: Date }
});

export default mongoose.model('AccessToken', AccessTokenSchema);
