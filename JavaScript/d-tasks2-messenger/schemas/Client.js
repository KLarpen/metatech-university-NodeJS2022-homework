({
  Entity: {},
  // TODO: How to request usage of UUID for primary key?

  account: 'Account',
  firstName: 'string',
  lastName: 'string',
  // TODO: How to describe domain models that not entity to be stored as JSONB in DB?
  phones: 'json',
  vehicle: 'Vehicle',
  billingSettings: { many: 'BillingSettings' },
});
