({
  Entity: {},
  // TODO: How to request usage of UUID for primary key?

  client: { type: 'Client', delete: 'cascade' },
  cardNo: {
    type: 'string',
    length: { min: 16, max: 19 },
    // TODO: How to describe string validation pattern?
  },
  main: { type: '?boolean', default: false },
});
