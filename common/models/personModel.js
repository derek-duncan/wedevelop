import mongoose from 'mongoose';
import shortid from 'shortid';

const Schema = mongoose.Schema;

/**
 * A Post holds the information to retrieve a markdown/html file
 */
let PersonSchema = new Schema({
  _id: { type: String, default: shortid.generate },
  name: { type: String },
  profile_picture: { type: String },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, }
});

PersonSchema.pre('save', function(next) {
  let self = this;
  self.updated_at = Date.now();
  return next();
});

export default mongoose.model('Person', PersonSchema);
