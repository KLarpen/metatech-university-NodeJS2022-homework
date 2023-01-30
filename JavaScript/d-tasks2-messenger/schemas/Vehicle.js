({
  Entity: {
    note: 'An electric vehicle model',
  },
  // TODO: How to request usage of UUID for primary key?

  model: { type: 'string', unique: true },
  kind: {
    enum: ['bicycle', 'scooter', 'motorcycle', 'car', 'van', 'truck', 'bus'],
    note: 'A kind of a vehicle',
    length: { max: 32 },
  },
  portType: 'PortType',
});
