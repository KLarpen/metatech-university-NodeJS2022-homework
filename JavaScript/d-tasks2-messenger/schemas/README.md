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

If the diagram not renders you may watch it on the [Mermaid.live](https://mermaid.live/edit#pako:eNp9VMuu0zAQ_RXL696qj4sQ2XELbBBS1SIWUBbTeNoYYruyHUrb9N8Z20lxH9AsqozPOTNzZuITL41AXnC07yRsLaiVZuxtWZpGe3Zuh8P2xBamRlawFa_AMXBObjWKFc-Rbfv0ZFo2qyXSW8Aqua08WyPzFSZsdxigJPoi61rq7RK9pz9HHFLPYGdDuVv2BStZdunNXlN-pqjimplNUu0BbRvxc2P958MuEPbSVwGxyOSWO5PKo6oY_AJZw7ru6stxswrsluoKcv_CZ_2YU2IXrAQdzm6760BzOKjeoD1Bgj-NQ8E2xmZFPECrxkU3N1JLVxEjdhcpc7A_KUlvbNdidLN_WIq2aZ7vayy9lWVsEu1ltBahrP72l1Pu_HiAv5Xt6rmh9lO5Ct8Pb8Wlu5vxKbww5igL9Rv3IEU6wEepBSMvRIiec2-umRoUpsAPZzQDISw6l0VqU4KXRl90ohedyNqYOtuF2wK-fWeukT6cfaCpxmPdqDU5UhrnL5JXBvxH-hE3bknH8VKh86B2_kj9gfUosk42FvGIYkbsBXh095x-o66yeeOhntMwMbMybePpCggqfP_3qvsKk3t8wBVaBVLQLRO58WOiAfAwZUEDCkMOOGi8WR50yQtvGxzwZieo5O5e6oM70Lw48d-8GD-Ph9PXb149X54BP_BidB7wozFEGA9H6TcdTcajyWgyHXAU0hv7KV168e6Lkl8jIWQ4_wGJprTW)


### Test variants of the same diagram with different detalization to find out the cause of GitHub rendering issue

Test 1: without all properties of the entities
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
```
Test 2: Entity Declaration first + no new line separation + without custom type properties
```mermaid
erDiagram
  Vehicle {
    string model
  }
  Parking {
    string name
    json address
    json location
  }
  Spot {
    bool available
    number cost
  }
  ChargingPort {
    bool available
    number cost
  }
  Rent {
    json freezedCostRates
    number totalPrice
  }
  Payment {
    number amount
    timestamptz when
  }
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
```
Test 3: Entity Declaration right after first mention + no new line separation + without custom type properties
```mermaid
erDiagram
  Account }|..|{ Role : "has assigned"
  Account ||--o| Client : "might be the"
  Client ||--|{ BillingSettings : has
  Client }o..|| Vehicle : "owns a model of"
  Vehicle {
    string model
  }
  Vehicle ||..|| PortType : with
  Rent }o..|| Spot : "the available"
  Rent {
    number totalPrice
  }
  Spot {
    bool available
    number cost
  }
  Rent }o..|| ChargingPort : "the available"
  Client ||--o{ Rent : can
  BillingSettings ||--o{ Payment : "will be used for"
  Payment {
    number amount
  }
  Rent ||--o{ Payment : "must be finished with"
  Parking ||--|{ Spot : has
  Parking {
    string name
  }
  Spot ||..|{ ElectricCharger : "has reachable"
  Spot ||..|{ ChargingPort : "has reachable"
  ChargingPort {
    bool available
    number cost
  }
  ElectricCharger ||--|{ ChargingPort : with
  ChargingPort ||..|| PortType : "is of"
```
