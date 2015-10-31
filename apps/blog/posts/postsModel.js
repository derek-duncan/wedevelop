import mongoose from 'mongoose';
import shortid from 'shortid';

const Schema = mongoose.Schema;

/**
 * A Post holds the information to retrieve a markdown/html file
 */
let PostSchema = new Schema({
  _id: { type: String, default: shortid.generate },
  machine_name: { type: String },
  name: { type: String },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, }
});

PostSchema.pre('save', next => {
  let self = this;
  this.machine_name = this.name.replace(/[^a-zA-Z0-9]/g, '').replace(' ', '-');
  return next();
});

export default mongoose.model('Post', PostSchema);


