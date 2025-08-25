## Sequence: issueTicket(vehicle, entryGateId)
Client         ParkingLot         SpotManager           ParkingSpot         Ticket
  |                |                   |                    |                 |
  |--issueTicket(v, gateId)            |                    |                 |
  |                |--nearestFree(type, gateId)----------->|                 |
  |                |                   |---- returns Spot --|                 |
  |                |--assignVehicle(v)-------------------->|--assignVehicle--|
  |                |                   |                    |                 |
  |                |-- new Ticket ------------------------>|                 |
  |                |<-------------- ticket ----------------|                 |
  |<----------- ticket ------------------------------------|                 |

## Sequence: exit(vehicleNumber, exitGateId)
Client         ParkingLot         SpotManager          ParkingSpot
  |                |                   |                   |
  |--exit(vehNo, gateId)              |                   |
  |                |-- getSpot(spotId) ------------------->|
  |                |                   |---- spot ---------|
  |                |-- computeFee(entry, now, type)        |
  |                |-- releaseSpot(spotId) ----------------|
  |<------ {ticket, exitTime, fee} ------------------------|
