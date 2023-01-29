({
  Entity: {},

  model: 'string',
  // TODO: How to describe one-to-many relation at the "one" side?
  // ports: { many: 'ChargingPort' }, // <-- this creates many-to-many
  // TODO: How to describe optional and NOT optional relation? E.g. to Parking
  parking: 'Parking',
});
