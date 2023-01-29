({
  ip: { js: 'string', metadata: { pg: 'inet' } },
  // TODO: How to describe array of enumerable strings?
  vehicleKindArray: {
    js: {
      array: {
        enum: [
          'bicycle',
          'scooter',
          'motorcycle',
          'car',
          'van',
          'truck',
          'bus',
        ],
        length: { max: 32 },
        note: 'A kind of a vehicle',
      },
    },
    metadata: { pg: 'varchar(32)[]' },
    checkType(src, path) {
      if (!Array.isArray(src)) {
        return `Field "${path}" not a vehicleKindArray 1`;
      }
      for (const value of src) {
        if (typeof value !== 'string')
          return `Field "${path}" not a vehicleKindArray 2`;
        else if (!this.js.array.enum.includes(value))
          return `Field "${path}" not a vehicleKindArray 3`;
      }
      return null;
    },
    construct() {}
  },
});
