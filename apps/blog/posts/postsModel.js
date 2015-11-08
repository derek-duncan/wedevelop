import mongoose from 'mongoose';
import shortid from 'shortid';

const Schema = mongoose.Schema;

/**
 * A Post holds the information to retrieve a markdown/html file
 */
let PostSchema = new Schema({
  _id: { type: String, default: shortid.generate },
  machine_name: { type: String },
  title: { type: String },
  body: { type: String },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, }
});

PostSchema.pre('save', function(next) {
  let self = this;
  self.machine_name = self.title.replace(/[^a-zA-Z0-9 ]/g, '').replace(/ /g, '-').toLowerCase() + '-' + self._id;
  return next();
});

export default mongoose.model('Post', PostSchema);


