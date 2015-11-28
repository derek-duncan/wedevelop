// Dependencies
import co from 'co';
import convert from 'koa-convert';
import Router from 'koa-66';
import parse from 'co-body';
import mongoose from 'mongoose';
import responseFormat from '../lib/responseFormat.js';

import config from '../../../config.js';

const Person = mongoose.model('Person');
const router = new Router();

// All routes are mounted with the /persons prefix
router.get('/persons', co.wrap(list));
router.post('/persons', co.wrap(add));

router.get('/persons/:personId', co.wrap(fetch));
router.put('/persons/:personId', co.wrap(update));
router.delete('/persons/:personId', co.wrap(remove));

export default router;

/**
 * Person listing
 */
function *list(ctx, next) {
  let persons = yield Person.find({}).exec();
  ctx.body = responseFormat(200, persons);
}

/**
 * Find a person by id
 */
function *fetch(ctx, next) {
  let personId = ctx.params.personId;
  let person = yield Person.findOne({ _id: personId }).exec();
  if (!person) ctx.throw(404);

  ctx.body = responseFormat(200, person);
}

/**
 * Add a person
 */
function *add(ctx, next) {
  let body = yield parse.form(ctx);
  let newPerson = new Person();
  newPerson.profile_picture = body.profile_picture;
  newPerson.name = body.name;
  newPerson.short_description = body.short_description;
  try {
    yield newPerson.save();
    ctx.status = 200;
    ctx.body = responseFormat(200, newPerson, 'success');
  } catch(err) {
    ctx.throw(err);
  }
}

/**
 * Update a person
 */
function *update(ctx, next) {
  let body = yield parse.form(ctx);
  let personId = ctx.params.personId;

  try {
    let person = yield Person.findOne({ _id: personId }).exec();
    person.profile_picture = body.profile_picture;
    person.name = body.name;
    person.short_description = body.short_description;
    yield person.save();

    ctx.status = 200;
    ctx.body = responseFormat(200, person, 'success');
  } catch(err) {
    ctx.throw(err);
  }
}

/**
 * Remove a person
 */
function *remove(ctx, next) {
  let personId = ctx.params.personId;

  try {
    yield Person.remove({ _id: personId });

    ctx.status = 200;
    ctx.body = responseFormat(200, null, 'success');
  } catch(err) {
    ctx.throw(err);
  }
}
