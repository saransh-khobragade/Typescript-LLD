# Parking lot LLD

## Design a parking lot system that supports different types of parking spots (e.g., for bikes, cars, trucks), ticket generation, entry/exit, and billing.

## Requirement
* There are multiple entry and exit gates.
* There are different parking spot types (bike, car, truck).
* When a vehicle enters:
    - It gets a ticket.
    - Allocate the nearest available spot of the correct type.

* When a vehicle exits:
    - Compute fee on exit using simple hourly pricing.
    - The spot is freed.

## LLD
![Parking Lot Diagram](parking-lot.png)
