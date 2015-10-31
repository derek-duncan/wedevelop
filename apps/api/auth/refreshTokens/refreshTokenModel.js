import mongoose from 'mongoose';
const Schema = mongoose.Schema;

//
// Schemas definitions
//
let RefreshTokenSchema = new Schema({
  refreshToken: { type: String },
  clientId: { type: String },
  userId: { type: String, ref: 'User' },
  expires: { type: Date }
});

export default mongoose.model('RefreshToken', RefreshTokenSchema);

