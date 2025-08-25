                          ┌─────────────────────┐
                          │     VehicleType     │
                          │  {BIKE, CAR}        │
                          └─────────▲───────────┘
                                    │
                                    │ has-a
                          ┌─────────┴───────────┐
                          │      Vehicle        │
                          │ - vehicleNumber     │
                          │ - vehicleType: VT   │
                          └─────────────────────┘


                          ┌─────────────────────┐
                          │      SpotType       │
                          │  {BIKE, CAR}        │
                          └─────────▲───────────┘
                                    │
                                    │ has-a
                          ┌─────────┴───────────┐
        is-a              │    ParkingSpot      │  <<abstract>>
  ┌───────────────────────┤ - spotId            │
  │                       │ - spotType: ST      │
  │                       │ - isFree            │
  │                       │ - assignedVehicle?  │─── has-a ───► Vehicle
  │                       │ + assignVehicle()   │
  │                       │ + removeVehicle()   │
  │                       └─────────▲───────────┘
  │                                 │
  │              ┌──────────────────┼─────────────────┐
  │              │                  │                 │
  │   is-a       │                  │ is-a            │
  │              │                  │                 │
┌─┴─────────┐    │              ┌───┴────────┐        │
│  CarSpot  │    │              │  BikeSpot │         │
└───────────┘    │              └───────────┘         │
(spotType=CAR)   │              (spotType=BIKE)       │
                 │                                    │
                 └─────────────────────────────────── ┘


┌───────────────────────┐
│        Ticket         │
│ - ticketId            │
│ - entryTime           │
│ - vehicle             │─── has-a ───► Vehicle
│ - spotId              │
└───────────────────────┘


┌───────────────────────────┐
│       SpotManager         │
│ - spots: Map<id, Spot>    │─── has-a ───► ParkingSpot[*]
│ + addSpot()               │
│ + getSpot()               │
│ + releaseSpot()           │
│ + getAvailableSpotByType()│
│ + assignVehicleToSpot()   │
└───────────▲────────────────┘
            │ has-a
┌───────────┴──────────────┐
│       ParkingLot         │
│ - ticketsById            │─── has-a ───► Ticket[*]
│ - activeTicketByVehicle  │
│ - spots: SpotManager     │
│ - pricing: Strategy      │─── has-a ───► PricingStrategy
│ + issueTicket()          │
│ + exit()                 │
└───────────▲──────────────┘
            │
            │ uses
┌───────────┴──────────────┐
│   PricingStrategy (IF)   │  <<interface>>
│ + calculateFee()         │
└───────────▲──────────────┘
            │ is-a
┌───────────┴──────────────┐
│   SimpleHourlyPricing    │
│ - ratePerHourCar         │
│ - ratePerHourBike        │
└──────────────────────────┘
