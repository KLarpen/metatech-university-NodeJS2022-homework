({
  Entity: {},

  spot: 'Spot',
  chargingPort: 'ChargingPort',
  client: 'Client',
  // TODO: How to describe DateTime value?
  started: { type: 'string' },
  finished: { type: 'string' },
  // TODO: How to describe domain models that not entity to be stored as JSONB in DB?
  freezedCostRates: 'json',
  totalPrice: 'number',
});
