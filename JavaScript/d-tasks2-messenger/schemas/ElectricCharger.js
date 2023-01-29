({
  Entity: {},

  model: 'string',
  ports: { many: 'ChargingPort' },
  // TODO: How to describe optional and NOT optional relation?
  parking: 'Parking',
});
