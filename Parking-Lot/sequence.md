## Sequence: issueTicket(vehicle)
Client         ParkingLot         SpotManager           ParkingSpot         Ticket
  |                |                   |                    |                 |
  |--issueTicket(v)|                   |                    |                 |
  |                |--getAvailableSpotByType(type)-------->|                 |
  |                |                   |---- returns Spot --|                 |
  |                |--assignVehicleToSpot(spotId, v)------>|--assignVehicle--|
  |                |                   |                    |                 |
  |                |-- new Ticket ------------------------>|                 |
  |                |<-------------- ticket ----------------|                 |
  |<----------- ticket ------------------------------------|                 |

## Sequence: exit(vehicleNumber)
Client         ParkingLot         SpotManager          ParkingSpot      PricingStrategy
  |                |                   |                   |                 |
  |--exit(vehNo)   |                   |                   |                 |
  |                |-- getSpot(spotId) ------------------->|                 |
  |                |                   |---- spot ---------|                 |
  |                |-- calculateFee(entry, now, type) ---------------------->|
  |                |<------------------------ fee ---------------------------|
  |                |-- releaseSpot(spotId) ------------------------------->  |
  |<------ {ticket, exitTime, fee} ------------------------------------------|
