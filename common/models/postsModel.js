import mongoose from 'mongoose';
import shortid from 'shortid';
import marked from 'marked';

const Schema = mongoose.Schema;

/**
 * A Post holds the information to retrieve a markdown/html file
 */
let PostSchema = new Schema({
  _id: { type: String, default: shortid.generate },
  machine_name: { type: String },
  person: { type: String, ref: 'Person' },
  title: { type: String },
  body: { type: String },
  body_html: { type: String },
  short_summary: { type: String },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, }
});

PostSchema.pre('save', function(next) {
  let self = this;
  self.machine_name = self.title.replace(/[^a-zA-Z0-9 ]/g, '').replace(/ /g, '-').toLowerCase() + '-' + self._id;
  self.body_html = marked(self.body);
  self.short_summary = self.body_html.substring(0, 300) + '...';
  self.updated_at = Date.now();
  return next();
});

export default mongoose.model('Post', PostSchema);


