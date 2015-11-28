// Dependencies
import co from 'co';
import path from 'path';
import convert from 'koa-convert';
import Router from 'koa-66';
import parse from 'co-body';
import mongoose from 'mongoose';

import config from '../../../config.js';

const Person = mongoose.model('Person');
const router = new Router();

// All routes are mounted with the /posts prefix
router.get('/persons', co.wrap(list));
router.get('/persons/new', co.wrap(add));
router.get('/persons/:personId', co.wrap(fetch));

export default router;

/**
 * Person listing
 */
function *list(ctx, next) {
  let persons = yield Person.find({}).sort('-created_at').exec();
  ctx.body = yield ctx.render('persons/list', {
    persons: persons
  });
}

/**
 * Find a person by id
 */
function *fetch(ctx, next) {
  let personId = ctx.params.personId;
  let person = yield Person.findOne({ _id: personId }).exec();
  if (!person) ctx.throw(404);

  ctx.body = yield ctx.render('persons/update', {
    person: person
  });
}

/**
 * Add a person
 */
function *add(ctx, next) {
  ctx.body = yield ctx.render('persons/new');
}
