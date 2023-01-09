CREATE TABLE "Role" (
  "roleId" bigint generated always as identity,
  "name" varchar NOT NULL
);

ALTER TABLE "Role" ADD CONSTRAINT "pkRole" PRIMARY KEY ("roleId");
CREATE UNIQUE INDEX "akRoleName" ON "Role" ("name");

CREATE TABLE "Account" (
  "accountId" bigint generated always as identity,
  "login" varchar(64) NOT NULL,
  "password" varchar NOT NULL
);

ALTER TABLE "Account" ADD CONSTRAINT "pkAccount" PRIMARY KEY ("accountId");
CREATE UNIQUE INDEX "akAccountLogin" ON "Account" ("login");

CREATE TABLE "AccountRole" (
  "accountId" bigint NOT NULL,
  "roleId" bigint NOT NULL
);

ALTER TABLE "AccountRole" ADD CONSTRAINT "pkAccountRole" PRIMARY KEY ("accountId", "roleId");
ALTER TABLE "AccountRole" ADD CONSTRAINT "fkAccountRoleAccount" FOREIGN KEY ("accountId") REFERENCES "Account" ("accountId") ON DELETE CASCADE;
ALTER TABLE "AccountRole" ADD CONSTRAINT "fkAccountRoleRole" FOREIGN KEY ("roleId") REFERENCES "Role" ("roleId") ON DELETE CASCADE;

CREATE TABLE "Area" (
  "areaId" bigint generated always as identity,
  "name" varchar NOT NULL,
  "ownerId" bigint NOT NULL
);

ALTER TABLE "Area" ADD CONSTRAINT "pkArea" PRIMARY KEY ("areaId");
CREATE UNIQUE INDEX "akAreaName" ON "Area" ("name");
ALTER TABLE "Area" ADD CONSTRAINT "fkAreaOwner" FOREIGN KEY ("ownerId") REFERENCES "Account" ("accountId");

CREATE TABLE "AreaAccount" (
  "areaId" bigint NOT NULL,
  "accountId" bigint NOT NULL
);

ALTER TABLE "AreaAccount" ADD CONSTRAINT "pkAreaAccount" PRIMARY KEY ("areaId", "accountId");
ALTER TABLE "AreaAccount" ADD CONSTRAINT "fkAreaAccountArea" FOREIGN KEY ("areaId") REFERENCES "Area" ("areaId") ON DELETE CASCADE;
ALTER TABLE "AreaAccount" ADD CONSTRAINT "fkAreaAccountAccount" FOREIGN KEY ("accountId") REFERENCES "Account" ("accountId") ON DELETE CASCADE;

CREATE TABLE "Message" (
  "messageId" bigint generated always as identity,
  "areaId" bigint NOT NULL,
  "fromId" bigint NOT NULL,
  "text" varchar NOT NULL
);

ALTER TABLE "Message" ADD CONSTRAINT "pkMessage" PRIMARY KEY ("messageId");
ALTER TABLE "Message" ADD CONSTRAINT "fkMessageArea" FOREIGN KEY ("areaId") REFERENCES "Area" ("areaId");
ALTER TABLE "Message" ADD CONSTRAINT "fkMessageFrom" FOREIGN KEY ("fromId") REFERENCES "Account" ("accountId");

CREATE TABLE "Session" (
  "sessionId" bigint generated always as identity,
  "accountId" bigint NOT NULL,
  "token" varchar NOT NULL,
  "ip" inet NOT NULL,
  "data" jsonb NOT NULL
);

ALTER TABLE "Session" ADD CONSTRAINT "pkSession" PRIMARY KEY ("sessionId");
ALTER TABLE "Session" ADD CONSTRAINT "fkSessionAccount" FOREIGN KEY ("accountId") REFERENCES "Account" ("accountId");
CREATE UNIQUE INDEX "akSessionToken" ON "Session" ("token");

CREATE TABLE "Parking" (
  "parkingId" uuid NOT NULL DEFAULT gen_random_uuid(),
  "name" varchar NOT NULL,
  "address" jsonb NOT NULL,
  "location" jsonb NOT NULL
);

ALTER TABLE "Parking" ADD CONSTRAINT "pkParking" PRIMARY KEY ("parkingId");

CREATE TABLE "Spot" (
  "spotId" uuid NOT NULL DEFAULT gen_random_uuid(),
  "parkingId" uuid NOT NULL,
  "floor" integer NOT NULL,
  "place" integer NOT NULL,
  "cost" double precision NOT NULL,
  "available" boolean DEFAULT TRUE,
  "suitableFor" varchar(32)[] NOT NULL
);

ALTER TABLE "Spot" ADD CONSTRAINT "pkSpot" PRIMARY KEY ("spotId");
ALTER TABLE "Spot" ADD CONSTRAINT "fkSpotParking" FOREIGN KEY ("parkingId") REFERENCES "Parking" ("parkingId") ON DELETE CASCADE;

CREATE TABLE "ElectricCharger" (
  "electricChargerId" uuid NOT NULL DEFAULT gen_random_uuid(),
  "model" varchar NOT NULL,
  "parkingId" uuid
);

ALTER TABLE "ElectricCharger" ADD CONSTRAINT "pkElectricCharger" PRIMARY KEY ("electricChargerId");
ALTER TABLE "ElectricCharger" ADD CONSTRAINT "fkElectricChargerParking" FOREIGN KEY ("parkingId") REFERENCES "Parking" ("parkingId");

CREATE TABLE "SpotElectricCharger" (
  "spotId" uuid NOT NULL,
  "electricChargerId" uuid NOT NULL
);

ALTER TABLE "SpotElectricCharger" ADD CONSTRAINT "pkSpotElectricCharger" PRIMARY KEY ("spotId", "electricChargerId");
ALTER TABLE "SpotElectricCharger" ADD CONSTRAINT "fkSpotElectricChargerSpot" FOREIGN KEY ("spotId") REFERENCES "Spot" ("spotId") ON DELETE CASCADE;
ALTER TABLE "SpotElectricCharger" ADD CONSTRAINT "fkSpotElectricChargerElectricCharger" FOREIGN KEY ("electricChargerId") REFERENCES "ElectricCharger" ("electricChargerId") ON DELETE CASCADE;


CREATE TABLE "PortType" (
  "portTypeId" bigint GENERATED ALWAYS AS IDENTITY,
  "socket" varchar(64) NOT NULL,
  "current" varchar(2) NOT NULL
);

ALTER TABLE "PortType" ADD CONSTRAINT "pkPortType" PRIMARY KEY ("portTypeId");
CREATE UNIQUE INDEX "akPortTypeSocket" ON "PortType" ("socket");

CREATE TABLE "ChargingPort" (
  "chargingPortId" uuid NOT NULL DEFAULT gen_random_uuid(),
  "portTypeId" bigint NOT NULL,
  "available" boolean DEFAULT TRUE,
  "cost" double precision NOT NULL,
  "power" double precision NOT NULL,
  "electricChargerId" uuid NOT NULL
);

ALTER TABLE "ChargingPort" ADD CONSTRAINT "pkChargingPort" PRIMARY KEY ("chargingPortId");
ALTER TABLE "ChargingPort" ADD CONSTRAINT "fkChargingPortElectricCharger" FOREIGN KEY ("electricChargerId") REFERENCES "ElectricCharger" ("electricChargerId") ON DELETE CASCADE;
ALTER TABLE "ChargingPort" ADD CONSTRAINT "fkChargingPortPortType" FOREIGN KEY ("portTypeId") REFERENCES "PortType" ("portTypeId");

CREATE TABLE "SpotChargingPort" (
  "spotId" uuid NOT NULL,
  "chargingPortId" uuid NOT NULL
);

ALTER TABLE "SpotChargingPort" ADD CONSTRAINT "pkSpotChargingPort" PRIMARY KEY ("spotId", "chargingPortId");
ALTER TABLE "SpotChargingPort" ADD CONSTRAINT "fkSpotChargingPortSpot" FOREIGN KEY ("spotId") REFERENCES "Spot" ("spotId") ON DELETE CASCADE;
ALTER TABLE "SpotChargingPort" ADD CONSTRAINT "fkSpotChargingPortChargingPort" FOREIGN KEY ("chargingPortId") REFERENCES "ChargingPort" ("chargingPortId") ON DELETE CASCADE;

CREATE TABLE "Vehicle" (
  "vehicleId" uuid NOT NULL DEFAULT gen_random_uuid(),
  "model" varchar NOT NULL,
  "kind" varchar(32) NOT NULL,
  "portTypeId" bigint NOT NULL
);

ALTER TABLE "Vehicle" ADD CONSTRAINT "pkVehicle" PRIMARY KEY ("vehicleId");
ALTER TABLE "Vehicle" ADD CONSTRAINT "fkVehiclePortType" FOREIGN KEY ("portTypeId") REFERENCES "PortType" ("portTypeId");
CREATE UNIQUE INDEX "akVehicleModel" ON "Vehicle" ("model");

CREATE TABLE "Client" (
  "clientId" uuid NOT NULL DEFAULT gen_random_uuid(),
  "accountId" bigint NOT NULL,
  "firstName" varchar NOT NULL,
  "lastName" varchar NOT NULL,
  "phones" jsonb,
  "vehicleId" uuid NOT NULL
);

ALTER TABLE "Client" ADD CONSTRAINT "pkClient" PRIMARY KEY ("clientId");
ALTER TABLE "Client" ADD CONSTRAINT "fkClientAccount" FOREIGN KEY ("accountId") REFERENCES "Account" ("accountId") ON DELETE CASCADE;
ALTER TABLE "Client" ADD CONSTRAINT "fkClientVehicle" FOREIGN KEY ("vehicleId") REFERENCES "Vehicle" ("vehicleId");

CREATE TABLE "BillingSettings" (
  "billingSettingsId" uuid NOT NULL DEFAULT gen_random_uuid(),
  "clientId" uuid NOT NULL,
  "cardNo" varchar(19) NOT NULL,
  "main" boolean DEFAULT FALSE
);

ALTER TABLE "BillingSettings" ADD CONSTRAINT "pkBillingSettings" PRIMARY KEY ("billingSettingsId");
ALTER TABLE "BillingSettings" ADD CONSTRAINT "fkBillingSettingsClient" FOREIGN KEY ("clientId") REFERENCES "Client" ("clientId") ON DELETE CASCADE;

CREATE TABLE "Rent" (
  "rentId" uuid NOT NULL DEFAULT gen_random_uuid(),
  "spotId" uuid NOT NULL,
  "chargingPortId" uuid NOT NULL,
  "clientId" uuid NOT NULL,
  "started" timestamptz NOT NULL,
  "finished" timestamptz,
  "freezedCostRates" jsonb NOT NULL,
  "totalPrice" double precision
);

ALTER TABLE "Rent" ADD CONSTRAINT "pkRent" PRIMARY KEY ("rentId");
ALTER TABLE "Rent" ADD CONSTRAINT "fkRentSpot" FOREIGN KEY ("spotId") REFERENCES "Spot" ("spotId");
ALTER TABLE "Rent" ADD CONSTRAINT "fkRentChargingPort" FOREIGN KEY ("chargingPortId") REFERENCES "ChargingPort" ("chargingPortId");
ALTER TABLE "Rent" ADD CONSTRAINT "fkRentClient" FOREIGN KEY ("clientId") REFERENCES "Client" ("clientId");

CREATE TABLE "Payment" (
  "paymentId" uuid NOT NULL DEFAULT gen_random_uuid(),
  "rentId" uuid NOT NULL,
  "billingSettingsId" uuid NOT NULL,
  "amount" double precision NOT NULL,
  "when" timestamptz NOT NULL
);

ALTER TABLE "Payment" ADD CONSTRAINT "pkPayment" PRIMARY KEY ("paymentId");
ALTER TABLE "Payment" ADD CONSTRAINT "fkPaymentRent" FOREIGN KEY ("rentId") REFERENCES "Rent" ("rentId");
ALTER TABLE "Payment" ADD CONSTRAINT "fkPaymentBillingSettings" FOREIGN KEY ("billingSettingsId") REFERENCES "BillingSettings" ("billingSettingsId");
