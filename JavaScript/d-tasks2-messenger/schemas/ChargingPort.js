({
  Entity: {},
  // TODO: How to request usage of UUID for primary key?

  available: { type: '?boolean', default: true },
  cost: 'double',
  type: 'PortType',
  power: 'double',
  station: { type: 'ElectricCharger', delete: 'cascade' },
});
