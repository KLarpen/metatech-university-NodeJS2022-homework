interface Role {
  name: string;
  roleId?: string;
}

interface Account {
  login: string;
  password: string;
  rolesId: string[];
  accountId?: string;
}

interface Area {
  name: string;
  ownerId: string;
  membersId: string[];
  areaId?: string;
}

interface PortType {
  socket: string;
  current: string;
  portTypeId?: string;
}

interface Vehicle {
  model: string;
  kind: string;
  portTypeId: string;
  vehicleId?: string;
}

interface Client {
  accountId: string;
  firstName: string;
  lastName: string;
  phones: string;
  vehicleId: string;
  clientId?: string;
}

interface BillingSettings {
  clientId: string;
  cardNo: string;
  main: boolean;
  billingSettingsId?: string;
}

interface Parking {
  name: string;
  address: string;
  location: string;
  parkingId?: string;
}

interface ElectricCharger {
  model: string;
  parkingId: string;
  electricChargerId?: string;
}

interface ChargingPort {
  available: boolean;
  cost: number;
  typeId: string;
  power: number;
  stationId: string;
  chargingPortId?: string;
}

interface Message {
  areaId: string;
  fromId: string;
  text: string;
  messageId?: string;
}

interface Spot {
  parkingId: string;
  floor: number;
  place: number;
  cost: number;
  available: boolean;
  suitableFor: string;
  chargersId: string[];
  portsId: string[];
  spotId?: string;
}

interface Rent {
  spotId: string;
  chargingPortId: string;
  clientId: string;
  started: string;
  finished: string;
  freezedCostRates: string;
  totalPrice: number;
  rentId?: string;
}

interface Payment {
  rentId: string;
  billingSettingsId: string;
  amount: number;
  when: string;
  paymentId?: string;
}

interface Session {
  accountId: string;
  token: string;
  ip: string;
  data: string;
  sessionId?: string;
}
