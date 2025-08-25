                          ┌─────────────────────┐
                          │     VehicleType     │
                          │ {BIKE, CAR, TRUCK}  │
                          └─────────▲───────────┘
                                    │
                                    │ has-a
                          ┌─────────┴───────────┐
                          │      Vehicle        │
                          │ - vehicleNumber     │
                          │ - vehicleType: VT   │
                          └─────────────────────┘


                          ┌─────────────────────┐
                          │     ParkingSpot     │
                          │ - spotId            │
                          │ - vehicleType: VT   │
                          │ - isFree            │
                          │ - assignedVehicle?  │─── has-a ───► Vehicle
                          │ - distanceByGate{}  │  entryGateId -> distance
                          │ + distanceFromGate()│
                          │ + assignVehicle()   │
                          │ + removeVehicle()   │
                          └─────────▲───────────┘
                                    │
                    ┌───────────────┼───────────────┐
                    │               │               │
                    │               │               │
                ┌───┴──────┐   ┌────┴─────┐   ┌─────┴─────┐
                │ CarSpot  │   │ BikeSpot │   │ TruckSpot │
                └──────────┘   └──────────┘   └───────────┘


┌──────────────────────────────┐
│            Ticket            │
│ - ticketId                   │
│ - entryTime                  │
│ - vehicleNumber              │
│ - spotId                     │
│ - entryGateId                │
└──────────────────────────────┘


┌───────────────────────────┐
│        SpotManager        │
│ - spots: ParkingSpot[]    │─── has-a ───► ParkingSpot[*]
│ + addSpot()               │
│ + getSpot()               │
│ + releaseSpot()           │
│ + nearestFree(type, gate) │  choose by min distanceFromGate
└───────────▲────────────────┘
            │ has-a
┌───────────┴──────────────┐
│        ParkingLot        │
│ - ticketsById            │─── has-a ───► Ticket[*]
│ - activeByVehicle        │  vehicleNumber -> ticketId
│ - spots: SpotManager     │
│ + issueTicket(v, gateId) │
│ + exit(vehicleNo, gateId)│
└──────────────────────────┘

Notes:
- Simple MVP: no interfaces or pricing strategies.
- Fees computed internally using a flat hourly rate per VehicleType.

