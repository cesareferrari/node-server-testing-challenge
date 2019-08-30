const db = require('../data/db-config.js');

module.exports = {
  create,
  find,
  destroy
}

function create(user) {
  return db('users').insert(user);
}

function find(id) {
  return db('users').where({id}).first();
}

function destroy(id) {
  return db('users').where({id}).del();
}
