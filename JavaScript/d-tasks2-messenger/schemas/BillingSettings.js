({
  Entity: {},
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
  client: { type: 'Client', delete: 'cascade' },
  // TODO: How to describe string validation pattern?
  /**
   * @example Validation pattern in JSON schema
  ```json
  "pattern": "^([0-9]{4})-([0-9]{4})-([0-9]{4})-([0-9]{4})$"
  ```
  */
  cardNo: {
    type: 'string',
    length: { min: 16, max: 19 },
  },
  main: { type: '?boolean', default: false },
});
