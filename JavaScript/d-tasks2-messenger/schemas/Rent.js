({
  Entity: {
    note: 'Renting of the parking spot for single electric vehicle',
  },
  // TODO: How to request usage of UUID for primary key?

  spot: 'Spot',
  chargingPort: 'ChargingPort',
  client: 'Client',
  started: { type: 'datetime' },
  finished: { type: '?datetime' },
  // TODO: How to describe domain models that not entity to be stored as JSONB in DB?
  /** JSON Schema example
   * @example
   * ```json
    "freezedCostRates": {
      "type": "object",
      "properties": {
        "spot": { "type": "number" },
        "port": { "type": "number" }
      },
      "required": ["spot", "port"]
    },
    ```
   */
  freezedCostRates: 'json',
  totalPrice: '?double',
});
