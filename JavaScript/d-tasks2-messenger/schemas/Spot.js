({
  Entity: {},

  parking: 'Parking',
  floor: 'number',
  place: 'number',
  cost: 'number',
  // TODO: How to describe default value?
  available: { type: 'boolean' },
  // TODO: How to describe array of enumerable strings?
  suitableFor: { type: 'string' },
  chargers: { many: 'ElectricCharger' },
  ports: { many: 'ChargingPort' },
});
