({
  Entity: {
    note: 'A parking spot for single electric vehicle',
  },
  // TODO: How to request usage of UUID for primary key?

  parking: { type: 'Parking', delete: 'cascade' },
  floor: 'number',
  place: 'number',
  cost: 'double',
  available: { type: '?boolean', default: true },
  suitableFor: {
    type: 'vehicleKindArray',
    // TODO: How to describe array of enumerable strings?
    // array: {
    //   enum: ['bicycle', 'scooter', 'motorcycle', 'car', 'van', 'truck', 'bus'],
    //   note: 'A kind of a vehicle',
    // },
  },
  chargers: { many: 'ElectricCharger' },
  ports: { many: 'ChargingPort' },
});
