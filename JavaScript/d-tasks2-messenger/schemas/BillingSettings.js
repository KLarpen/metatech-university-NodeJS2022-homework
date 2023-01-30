({
  Entity: {},
  // TODO: How to request usage of UUID for primary key?

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
