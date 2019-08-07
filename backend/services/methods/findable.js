const config = require('./config');
const mongoose = require('mongoose');

async function find(model, page = 1, perPage = 20, resource, sort, filter, projection, populate, lean, aggregate) {
  resource = aggregate ? resource ? {...resource, $expr: aggregate} : { $expr: aggregate }: resource;
  let query = resource ? model.find(resource, projection) : model.find({}, projection);

  query = perPage ? query.limit(perPage) : query;
  query = page && perPage ? query.skip((page - 1) * perPage) : query;
  query = filter ? query.select(filter) : query;
  query = sort ? query.sort(sort) : query;
  query = populate ? query.populate(populate) : query;
  query = lean ? query.lean() : query;
  return await query.exec();
}

module.exports = find;
