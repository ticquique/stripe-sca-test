
async function findable(service, req, res, next) {
  let { resources, filter, sort, page, perPage, populate, projection, aggregate, lean } = req.query;
  resources = resources ? JSON.parse(resources) : null;
  filter = filter ? JSON.parse(filter) : null;
  sort = sort ? JSON.parse(sort) : null;
  page = page ? parseInt(page, 10) : null;
  perPage = perPage ? parseInt(perPage, 10) : null;
  populate = populate ? populate : false;
  aggregate = aggregate ? JSON.parse(aggregate) : null;
  lean = lean ? lean : false;

  const elements = await service.find(page, perPage, resources, sort, filter, projection, populate, lean, aggregate);
  return elements;
}

module.exports = findable;
