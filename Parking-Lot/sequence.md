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

## Sequence: exit(ticketId, exitGateId)
Client         ParkingLot         SpotManager          ParkingSpot
  |                |                   |                   |
  |--exit(ticketId, gateId)           |                   |
  |                |-- getSpot(spotId) ------------------->|
  |                |                   |---- spot ---------|
  |                |-- computeFee(entry, now, type)        |
  |                |-- releaseSpot(spotId) ----------------|
  |<------ {ticket, exitTime, fee} ------------------------|
