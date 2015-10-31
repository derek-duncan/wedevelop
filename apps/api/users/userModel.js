'use strict';

import mongoose from 'mongoose';
import shortid from 'shortid';
const Schema = mongoose.Schema;

/**
 * User schema
 */
var UserSchema = new Schema({
  _id: {
    type: String,
    default: shortid.generate
  },
  created: {
    type: Date,
    default: Date.now
  },
  scopes: [String],
  firstname: String,
  lastname: String,
  email: {
    type: String,
    required: true,
    lowercase: true,
    index: {
      unique: true
    }
  },
  password: {
    type: String
  },
  deleted: {
    type: Boolean,
    default: false
  },
});

UserSchema.pre('save', function(next) {
  var self = this;
  next();
});

const User = mongoose.model('User', UserSchema);

export default User;
