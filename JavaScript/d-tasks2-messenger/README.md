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
  Vehicle }|..|| PortType : with

  Rent }o..|| Spot : "the available"
  Rent }o..|| ChargingPort : "the available"
  Client ||--o{ Rent : can
  BillingSettings ||--o{ Payment : "will be used for"
  Rent ||--o{ Payment : "must be finished with"

  Parking ||--|{ Spot : has
  Spot }|..|{ ElectricCharger : "has reachable"
  Spot }|..|{ ChargingPort : "has reachable"
  ElectricCharger ||--|{ ChargingPort : with
  ChargingPort }|..|| PortType : "is of"

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
    VehicleKindArray suitableFor
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

If the diagram not renders you may watch it on the [Mermaid.live](https://mermaid.live/edit#pako:eNp9VMuOGjEQ_BXLZxaFRNqs5rYhm0sUCUGUQ8SlGTeMN34g2xMCM_x72h7DmkciDiPbVdXdVcYdr61AXnF0nyVsHOilYey5rm1rAjv243HfsblVyCq25A14Bt7LjUGx5CWy7x8ebM-mSiKtIlbLTRPYCllocMDmwwgl0U9SKWk2CwyBPp44pF7AjpZq9-wHNrLO5e3OUH2mqWPF7HpQPQFSrz2bWRe-77eRsJOhWZqImReCi60dGqS-GPwGqWClcoclbtqA21BnUfBf-GIi2w3sitWQal7Pl0Ez2OuTRTuCRIdaj4KtrSuauIPWrU9-rqWRviFGmo8PE87A_aIyJ3PzkNnRtMpZviisg5N1Gg_dOVaHUDdvk5WUGyfu4K9lcx9X1CERdrl9G9ySS5_zLRPu4oIxT3Vo0nQLhp0M-CqNYOSCiLvH0pVLpgGNw8art4aBEA69L3aUrSFIa846yY0ssrJWFffguoFn52DPfCtDPP5CoSaEafWKbKmtD2fVCxf-o36Pmy5J5gSp0QfQ23CgEcEFFMUwa4d4QDEl9hwC-lvO6UJdVAs2gJpRoli4OVzG7gIIOj4At6q7BgcD-YhrdBqkoGcmcdN_iTLgMWpBGcWkIw7aYBd7U_MquBZHvN0Kajk_TLxag_K0uwXDq47_4dXk6f346ePj5MPj6Tfie169O474wVpiTEYchQzWfRteufTYJYWf6TyWOf4Fl8uyag)
