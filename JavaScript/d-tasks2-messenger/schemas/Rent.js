({
  Entity: {
    note: 'Renting of the parking spot for single electric vehicle',
  },
  /* Metarhia does not support UUID for primary key.
    That's intentional decision due to performance concerns.
    So in the case of UUID needed you must declare separate field (e.g. `guid`)
    to hold generated identifier and mark it as unique. */

  /**
   * Universally unique identifier for cross-system or public communication about the entity.
   * Used as a separate ID key only!
   * All internal entity references uses primary generated as identity key of type BigInt.
   */
  guid: {
    /** Custom type: autogenerated by Postgres UUID */
    type: 'genUUID',
    unique: true,
  },
  spot: 'Spot',
  chargingPort: 'ChargingPort',
  client: 'Client',
  started: { type: 'datetime' },
  finished: { type: '?datetime' },
  // Custom type to describe domain models that not entity to be stored as JSONB in DB
  freezedCostRates: 'costRatesObject',
  totalPrice: '?double',
});
