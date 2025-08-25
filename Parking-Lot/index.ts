enum VehicleType {
  BIKE = "BIKE",
  CAR = "CAR",
}
enum SpotType {
  BIKE = "BIKE",
  CAR = "CAR",
}
class Vehicle {
  public vehicleNumber: string;
  public vehicleType: VehicleType;
}

abstract class ParkingSpot {
  constructor(
    public spotId: string,
    public vehicleType: SpotType,
    public isFree: boolean = true,
    public assignedVehicle: Vehicle | null = null
  ) {}
  assignVehicle() {}
  removeVehicle() {}
}
class CarSpot extends ParkingSpot {
  constructor(spotId: string) {
    super(spotId, SpotType.BIKE);
  }
}
class BikeSpot extends ParkingSpot {
  constructor(spotId: string) {
    super(spotId, SpotType.BIKE);
  }
}
class Ticket {
  constructor(
    ticketId: string,
    entryTime: Date,
    vehicle: Vehicle,
    spot: SpotType
  ) {}
}
class ParkingLot {}

class SpotManager {
  constructor(private spots: ParkingSpot[] = []) {}

  addSpot(spot: ParkingSpot): void {
    this.spots.push(spot);
  }
  releaseSpot(spotId: string): void {
    const spot = this.spots.find((x) => x.spotId == spotId);
    spot?.removeVehicle();
  }
  getAvailableSpot(spot: ParkingSpot): ParkingSpot | undefined {
    return this.spots.find((x) => {
      if (x.isFree && x.vehicleType == spot.vehicleType) {
        return x;
      }
    });
  }
}
