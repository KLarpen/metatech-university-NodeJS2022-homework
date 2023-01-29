({
  Entity: {},
  // TODO: How to request usage of UUID for primary key?

  model: 'string',
  // TODO: How to describe one-to-many relation at the "one" side?
  // ports: { many: 'ChargingPort' }, // <-- this creates many-to-many
  parking: '?Parking',
});
