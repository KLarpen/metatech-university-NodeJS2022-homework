# Metatech University. NodeJS 2022 Homework. Tasks #2

## Messenger domain
```mermaid
erDiagram
  Account }|..|{ Role : "has assigned"
  Account ||--o| Session : "might have"
  Area }o--|| Account : "owned by"
  Area }o..|{ Account : "has members"
  Area ||--o{ Message: "contains"
  Message ||--|| Account : from
  Account {
    string login
    string password
  }
  Session {
    string token
    string ip
    json data
  }
  Area {
    string name
  }
```

## Selected custom domain: EV Parking
Parking network for electric vehicles with warranty of available electric charger on the spot.

```mermaid
erDiagram
  Account }|..|{ Role : "has assigned"
  Account ||--o| Client : "might be the"
  Client ||--|{ BillingSettings : has
  Client }o..|| Vehicle : "owns a model of"
  Vehicle ||..|| PortType : with

  Rent }o..|| Spot : "the available"
  Rent }o..|| ChargingPort : "the available"
  Client ||--o{ Rent : can
  BillingSettings ||--o{ Payment : "will be used for"
  Payment }o--|| Rent  : "for the"

  Parking ||--|{ Spot : has
  Spot ||..|{ ElectricCharger : "has reachable"
  Spot ||..|{ ChargingPort : "has reachable"
  ElectricCharger ||--|{ ChargingPort : with
  ChargingPort ||..|| PortType : "is of"

  Vehicle {
    string model
    VehicleKind kind
  }
  Parking {
    string name
    json address
    json location
  }
  Spot {
    bool available
    VehicleKind[] suitableFor
    number cost
  }
  ChargingPort {
    bool available
    number cost
  }
  Rent {
    timestamptz started
    json freezedCostRates
    timestamptz finished
    number totalPrice
  }
  Payment {
    number amount
    timestamptz when
  }
```

#### Alternative declaration for the Rent -- Payment relation:
(semantic difference that visualized by Mermaid's diagram logic)
```mermaid
erDiagram
  Account }|..|{ Role : "has assigned"
  Account ||--o| Client : "might be the"
  Client ||--|{ BillingSettings : has
  Client }o..|| Vehicle : "owns a model of"
  Vehicle ||..|| PortType : with
  Rent }o..|| Spot : "the available"
  Rent }o..|| ChargingPort : "the available"
  Client ||--o{ Rent : can
  BillingSettings ||--o{ Payment : "will be used for"
  Rent ||--o{ Payment : "must be finished with"
  Parking ||--|{ Spot : has
  Spot ||..|{ ElectricCharger : "has reachable"
  Spot ||..|{ ChargingPort : "has reachable"
  ElectricCharger ||--|{ ChargingPort : with
  ChargingPort ||..|| PortType : "is of"
  Vehicle {
    string model
    VehicleKind kind
  }
  Parking {
    string name
    json address
    json location
  }
  Spot {
    bool available
    VehicleKind[] suitableFor
    number cost
  }
  ChargingPort {
    bool available
    number cost
  }
  Rent {
    timestamptz started
    json freezedCostRates
    timestamptz finished
    number totalPrice
  }
  Payment {
    number amount
    timestamptz when
  }
```
