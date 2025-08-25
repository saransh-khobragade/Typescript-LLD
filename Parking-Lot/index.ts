// ==== Parking Lot — SIMPLE MVP (no activeByVehicle map) ====
// Features:
// - Spot types: BIKE, CAR, TRUCK
// - Multiple entry/exit gates (pass gateId string)
// - Entry: issue ticket + allocate nearest free spot of the right type
// - Exit: compute simple hourly fee + free the spot

// -- Enums --
enum VehicleType {
  BIKE = "BIKE",
  CAR = "CAR",
  TRUCK = "TRUCK",
}

// -- Models --
class Vehicle {
  constructor(
    public vehicleNumber: string,
    public vehicleType: VehicleType
  ) {}
}

class ParkingSpot {
  public isFree = true;
  public assignedVehicle: Vehicle | null = null;

  constructor(
    public spotId: string,
    public vehicleType: VehicleType,
    public distanceByGate: Record<string, number> = {}
  ) {}

  distanceFromGate(entryGateId: string): number {
    const d = this.distanceByGate[entryGateId];
    return Number.isFinite(d) ? d : Number.POSITIVE_INFINITY;
  }

  assignVehicle(vehicle: Vehicle): void {
    if (!this.isFree) throw new Error(`Spot ${this.spotId} is occupied`);
    if (vehicle.vehicleType !== this.vehicleType) {
      throw new Error(`Vehicle ${vehicle.vehicleType} not allowed on ${this.vehicleType} spot`);
    }
    this.assignedVehicle = vehicle;
    this.isFree = false;
  }

  removeVehicle(): void {
    if (this.isFree) return;
    this.assignedVehicle = null;
    this.isFree = true;
  }
}

class CarSpot extends ParkingSpot { constructor(id: string, dist: Record<string, number> = {}) { super(id, VehicleType.CAR, dist); } }
class BikeSpot extends ParkingSpot { constructor(id: string, dist: Record<string, number> = {}) { super(id, VehicleType.BIKE, dist); } }
class TruckSpot extends ParkingSpot { constructor(id: string, dist: Record<string, number> = {}) { super(id, VehicleType.TRUCK, dist); } }

class Ticket {
  constructor(
    public ticketId: string,
    public entryTime: Date,
    public vehicleNumber: string,
    public spotId: string,
    public entryGateId: string
  ) {}
}

// -- Pricing (simple hourly) --
const RATE_PER_HOUR: Record<VehicleType, number> = {
  [VehicleType.BIKE]: 20,
  [VehicleType.CAR]: 50,
  [VehicleType.TRUCK]: 100,
};

function computeFee(entry: Date, exit: Date, vType: VehicleType): number {
  const ms = Math.max(0, exit.getTime() - entry.getTime());
  const hours = Math.ceil(ms / (1000 * 60 * 60));
  const rate = RATE_PER_HOUR[vType];
  return Math.max(rate, hours * rate); // minimum 1 hour
}

// -- Spot Manager --
class SpotManager {
  private spots: ParkingSpot[] = [];

  addSpot(spot: ParkingSpot): void { this.spots.push(spot); }

  getSpot(id: string): ParkingSpot | undefined { return this.spots.find(s => s.spotId === id); }

  releaseSpot(id: string): void {
    const s = this.getSpot(id);
    if (!s) throw new Error(`Spot ${id} not found`);
    s.removeVehicle();
  }

  nearestFree(type: VehicleType, entryGateId: string): ParkingSpot | undefined {
    let best: ParkingSpot | undefined;
    let bestDist = Number.POSITIVE_INFINITY;
    for (const s of this.spots) {
      if (!s.isFree) continue;
      if (s.vehicleType !== type) continue;
      const d = s.distanceFromGate(entryGateId);
      if (d < bestDist) { best = s; bestDist = d; }
    }
    return best;
  }
}

// -- Parking Lot (facade) --
class ParkingLot {
  private ticketsById = new Map<string, Ticket>();

  constructor(
    private spots: SpotManager,
    private now: () => Date = () => new Date(),
    private makeId: () => string = () => `T-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`
  ) {}

  issueTicket(vehicle: Vehicle, entryGateId: string): Ticket {
    // check if vehicle already parked (scan tickets)
    for (const t of this.ticketsById.values()) {
      if (t.vehicleNumber === vehicle.vehicleNumber && this.spots.getSpot(t.spotId)?.isFree === false) {
        throw new Error(`Vehicle ${vehicle.vehicleNumber} already parked`);
      }
    }

    const spot = this.spots.nearestFree(vehicle.vehicleType, entryGateId);
    if (!spot) throw new Error(`No ${vehicle.vehicleType} spots available`);

    spot.assignVehicle(vehicle);
    const t = new Ticket(this.makeId(), this.now(), vehicle.vehicleNumber, spot.spotId, entryGateId);
    this.ticketsById.set(t.ticketId, t);
    return t;
  }

  exit(ticketId: string, _exitGateId: string): { fee: number; exitTime: Date; ticket: Ticket } {
    const ticket = this.ticketsById.get(ticketId);
    if (!ticket) throw new Error(`Ticket ${ticketId} not found`);

    const spot = this.spots.getSpot(ticket.spotId);
    if (!spot) throw new Error(`Spot ${ticket.spotId} not found`);

    const exitTime = this.now();
    const fee = computeFee(ticket.entryTime, exitTime, spot.vehicleType);

    this.spots.releaseSpot(spot.spotId);

    return { fee, exitTime, ticket };
  }
}

// -- Example --
const m = new SpotManager();
m.addSpot(new CarSpot("C1", { G1: 10, G2: 30 }));
m.addSpot(new CarSpot("C2", { G1: 15, G2: 20 }));
m.addSpot(new BikeSpot("B1", { G1: 5,  G2: 40 }));
m.addSpot(new TruckSpot("T1", { G1: 100, G2: 10 }));
const lot = new ParkingLot(m);
const car = new Vehicle("MH12AB1234", VehicleType.CAR);
const t = lot.issueTicket(car, "G1");
console.log("Ticket:", t);
const result = lot.exit(t.ticketId, "G2");
console.log("Exit:", result);
