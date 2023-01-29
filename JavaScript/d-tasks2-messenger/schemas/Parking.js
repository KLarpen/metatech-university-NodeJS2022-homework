({
  Entity: {},

  name: 'string',
  // TODO: How to describe domain models that not entity to be stored as JSONB in DB?
  address: 'json',
  location: 'json',
  spots: { many: 'Spot' },
  chargers: { many: 'ElectricCharger' },
});
