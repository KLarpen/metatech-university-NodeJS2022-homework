({
  Entity: {
    note: 'A parking for electric vehicles',
  },
  // TODO: How to request usage of UUID for primary key?

  name: 'string',
  // TODO: How to describe domain models that not entity to be stored as JSONB in DB?
  /** JSON Schema example
   * @example
   * ```json
    "address": {
      "type": "object",
      "properties": {
        "country": { "type": "string" },
        "state": { "type": "string" },
        "city": { "type": "string" },
        "streetAddress": { "type": "string" }
      },
      "additionalProperties": false,
      "required": ["country", "city", "streetAddress"]
    }
    ```
   */
  address: 'json',
  // TODO: How to describe domain models that not entity to be stored as JSONB in DB?
  /** JSON Schema example
   * @example
   * ```json
   {
      "title": "Longitude and Latitude Values",
      "description": "A geographical coordinate.",
      "type": "object",
      "properties": {
        "latitude": {
          "type": "number",
          "minimum": -90,
          "maximum": 90
        },
        "longitude": {
          "type": "number",
          "minimum": -180,
          "maximum": 180
        }
      },
      "required": [ "latitude", "longitude" ]
    }
    ```
   */
  location: 'json',
  // TODO: How to describe one-to-many relation at the "one" side?
  // spots: { many: 'Spot' },  // <-- this creates many-to-many
  // chargers: { many: 'ElectricCharger' }, // <-- this creates many-to-many
});
