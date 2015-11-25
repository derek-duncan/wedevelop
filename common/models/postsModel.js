import mongoose from 'mongoose';
import shortid from 'shortid';

const Schema = mongoose.Schema;

/**
 * A Post holds the information to retrieve a markdown/html file
 */
let PostSchema = new Schema({
  _id: { type: String, default: shortid.generate },
  machine_name: { type: String },
  person: { type: Schema.Types.ObjectId, ref: 'Person' },
  title: { type: String },
  body: { type: String },
  short_summary: { type: String },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, }
});

PostSchema.pre('save', function(next) {
  let self = this;
  self.machine_name = self.title.replace(/[^a-zA-Z0-9 ]/g, '').replace(/ /g, '-').toLowerCase() + '-' + self._id;
  self.short_summary = self.body.substring(0, 300) + '...';
  self.updated_at = Date.now();
  return next();
});

export default mongoose.model('Post', PostSchema);


