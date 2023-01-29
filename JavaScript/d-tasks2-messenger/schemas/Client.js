({
  Entity: {},
  // TODO: How to request usage of UUID for primary key?

  account: { type: 'Account', delete: 'cascade' },
  firstName: 'string',
  lastName: 'string',
  // TODO: How to describe domain models that not entity to be stored as JSONB in DB?
  phones: 'json',
  vehicle: 'Vehicle',
  // TODO: How to describe one-to-many relation at the "one" side?
  // billingSettings: { many: 'BillingSettings' }, // <-- this creates many-to-many
});
