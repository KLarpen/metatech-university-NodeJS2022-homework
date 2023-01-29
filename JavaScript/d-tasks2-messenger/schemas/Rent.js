({
  Entity: {},
  // TODO: How to request usage of UUID for primary key?

  spot: 'Spot',
  chargingPort: 'ChargingPort',
  client: 'Client',
  started: { type: 'datetime' },
  finished: { type: '?datetime' },
  // TODO: How to describe domain models that not entity to be stored as JSONB in DB?
  freezedCostRates: 'json',
  totalPrice: '?double',
});
