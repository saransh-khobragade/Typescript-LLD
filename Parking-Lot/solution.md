                         +------------------+
                         |   VehicleType    |
                         | {BIKE,CAR,TRUCK} |
                         +------------------+

+-------------------+                 +----------------------------+
|      Vehicle      |                 |         Ticket             |
+-------------------+                 +----------------------------+
| - vehicleNumber   |                 | - ticketId: string         |
| - vehicleType: VT |                 | - entryTime: Date          |
+-------------------+                 | - vehicleNumber: string    |
                                      | - spotId: string           |
                                      | - entryGateId: string      |
                                      +----------------------------+

                         is-a
     +---------------------^---------------------+
     |                                           |
+------------+      +------------+        +-------------+
|  CarSpot   |      |  BikeSpot  |        |  TruckSpot  |
+------------+      +------------+        +-------------+
      is-a                 is-a                  is-a
          \                 |                    /
           \                |                   /
            \               |                  /
             v              v                 v
                +----------------------------+
                |        ParkingSpot         |
                +----------------------------+
                | - spotId: string           |
                | - vehicleType: VT          |
                | - isFree: boolean          |
                | - assignedVehicle?:Vehicle |
                | - distanceByGate: {gateId->d}
                +----------------------------+
                | + distanceFromGate(gateId) |
                | + assignVehicle(v)         |
                | + removeVehicle()          |
                +----------------------------+

+----------------------------+          has-a (manages many)
|        SpotManager         |------------------------------------+
+----------------------------+                                    |
| - spots: ParkingSpot[]     |                                    |
+----------------------------+                                    |
| + addSpot(spot)            |                                    |
| + getSpot(id)              |                                    |
| + releaseSpot(id)          |                                    |
| + nearestFree(type, gate)  |<--- uses ParkingSpot.distanceFromGate
+----------------------------+

                 has-a (uses)
+----------------------------+
|        ParkingLot          |
+----------------------------+
| - ticketsById: Map         |
| - spots: SpotManager       |
| - now(): Date              |
| - makeId(): string         |
+----------------------------+
| + issueTicket(vehicle,     |
|               entryGateId) |
| + exit(ticketId, exitGate) |
+----------------------------+
