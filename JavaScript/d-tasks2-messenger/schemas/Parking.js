({
  Entity: {
    note: 'A parking for electric vehicles',
  },
  // TODO: How to request usage of UUID for primary key?

  name: 'string',
  // TODO: How to describe domain models that not entity to be stored as JSONB in DB?
  address: 'json',
  location: 'json',
  // TODO: How to describe one-to-many relation at the "one" side?
  // spots: { many: 'Spot' },  // <-- this creates many-to-many
  // chargers: { many: 'ElectricCharger' }, // <-- this creates many-to-many
});
