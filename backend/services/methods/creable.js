async function create(model, element, populate) {
  let newElement = await model.create(element);
  newElement = populate ? await model.populate(newElement, populate) : newElement;
  return newElement;
}

module.exports = create;
