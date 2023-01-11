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

If the diagram not renders you may watch it on the [Mermaid.live](https://mermaid.live/edit#pako:eNp9VMuO2zAM_BVC5939gNzatL0UBYKk2MumB0ZiYrV6BJLcIBvn30tJdqo8WvhgmJoZkkNaJyG9IjETFD5p3AW0awfwQUrfuwTn4eVlOMHSG4IZrEWHETBGvXOk1qJFDsPzsx9gbjTxV8ZavesSbAhSRxU7HmYoi37Uxmi3W1FK_IrMYfUGdvace4BX6rQc0_uD4_xguWIDfltVJ8AwFPzCh_T9uM-Eg05dRiwbudXe1_K4KsDfqA1uzFhfi5t3GHZcV5b7F77px58qewYSXT677W4ELfBoJ4MODMn-9JEUbH1oiniAtn0sbm6107FjRumuUBYYfnGSydixxeLm9ECNDnWenw3JFLQsTVK4jDYQyu5vfy3lzo8H-FvZsZ4b6jSVq_D98NZCx7sZn_IHQOQs3G_ZgxoZAV-1U8BeqBw9t95cMx1aqoGf0TtApQLF2ESMl5i0dxed4sUosvHeNLtwW8DbD4i9TvnsC0-1HLvebtgR6WO6SF4Z8B_pR9yyJSMnaUsxod2nd-4PQyLVdLINRO-k5sxeYqJ4z5k26ipb8gnNgodJjZV1G09XQLT5_79XPXRU3RNPwlKwqBXfMoVbfiYegMhTVjygPOSMwz751dFJMUuhpyfR7xWXPN5LU5CUTj58q7dWubzOfwAjFaDa)
