({
  ip: { js: 'string', metadata: { pg: 'inet' } },
  /** Autogenerated by Postgres UUID v4 */
  genUUID: { js: 'string', metadata: { pg: 'uuid DEFAULT gen_random_uuid()' } },
  /**
   * Custom type to describe array of enumerable strings
   *
   * Metaschema & Metasql does not natively support Postgres' character varying array type.
   * This implements proper type on Postgres side and validation method but querying a data is still
   * untested so might not working properly.
   *
   * TODO: Testing needed
   */
  vehicleKindArray: {
    js: {
      array: {
        // TODO: Can you reference one custom type as a type of items within other custom collection type?
        enum: [
          'bicycle',
          'scooter',
          'motorcycle',
          'car',
          'van',
          'truck',
          'bus',
        ],
        note: 'A kind of a vehicle',
      },
    },
    metadata: { pg: 'varchar(32)[]' },
    construct() {},
    checkType(src, path) {
      if (!Array.isArray(src)) {
        return `Field "${path}" not a vehicleKindArray 1`;
      }
      for (const value of src) {
        if (typeof value !== 'string')
          return `Field "${path}" contains non string item value (actual type "${typeof value}") that's not compatible with vehicleKindArray type`;
        else if (!this.js.array.enum.includes(value))
          return `Field "${path}" contains item value "${value}" that's not compatible with vehicleKindArray enum type`;
      }
      return null;
    },
  },
  /**
   * Custom card number string type with validation pattern
   * @example Related validation pattern in JSON schema
  ```json
  "pattern": "^([0-9]{4})-([0-9]{4})-([0-9]{4})-([0-9]{4})$"
  ```
  */
  cardNumber: {
    js: {
      type: 'string',
      length: { min: 16, max: 19 },
    },
    metadata: { pg: 'varchar(19)' },
    construct() {},
    checkType(src, path) {
      if (typeof src !== 'string')
        return `Field "${path}" not a cardNumber string (actual type "${typeof src}")`;
      else {
        const allowedChars = '0123456789';
        const notice = `Field "${path}" contains value not in a cardNumber format`;
        const filtered = src.replace('-', '');
        if (src.length > 19 || filtered.length !== 16) return notice;
        for (let i = 0; i < 16; i++) {
          const char = filtered[i];
          if (!allowedChars.includes(char)) return notice;
        }
      }
      return null;
    },
  },
});
