import Vehicle, { VehicleType } from "../model/Vehicle";
import SpotManager from "./SpotManagerService";
import Ticket from "../model/Ticket";

// SRP: Single responsibility - manages parking lot operations (entry/exit/ticketing)
class ParkingLotService {
    private ticketsById = new Map<string, Ticket>();
    // -- Pricing (simple hourly) --
    private RATE_PER_HOUR: Record<VehicleType, number> = {
        [VehicleType.BIKE]: 20,
        [VehicleType.CAR]: 50,
        [VehicleType.TRUCK]: 100,
    };

    constructor(private spots: SpotManager) {} // DIP: Dependency Inversion - depends on SpotManager abstraction, not concrete implementation

    makeId(): string {
        return `T-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
    }

    issueTicket(vehicle: Vehicle, entryGateId: string): Ticket {
        // check if vehicle already parked (scan tickets)
        for (const t of this.ticketsById.values()) {
            if (
                t.vehicleNumber === vehicle.vehicleNumber &&
                this.spots.getSpot(t.spotId)?.isFree === false
            ) {
                throw new Error(
                    `Vehicle ${vehicle.vehicleNumber} already parked`
                );
            }
        }

        const spot = this.spots.nearestFree(vehicle.vehicleType, entryGateId);
        if (!spot) throw new Error(`No ${vehicle.vehicleType} spots available`);

        spot.assignVehicle(vehicle);
        const t = new Ticket(
            this.makeId(),
            new Date(),
            vehicle.vehicleNumber,
            spot.spotId,
            entryGateId
        );
        this.ticketsById.set(t.ticketId, t);
        return t;
    }

    computeFee(entry: Date, exit: Date, vType: VehicleType): number {
        const ms = Math.max(0, exit.getTime() - entry.getTime());
        const hours = Math.ceil(ms / (1000 * 60 * 60));
        const rate = this.RATE_PER_HOUR[vType];
        // Strategy Pattern: Different pricing strategies based on vehicle type
        return Math.max(rate, hours * rate); // minimum 1 hour
    }

    exit(
        ticketId: string,
        _exitGateId: string
    ): { fee: number; exitTime: Date; ticket: Ticket } {
        const ticket = this.ticketsById.get(ticketId);
        if (!ticket) throw new Error(`Ticket ${ticketId} not found`);

        const spot = this.spots.getSpot(ticket.spotId);
        if (!spot) throw new Error(`Spot ${ticket.spotId} not found`);

        const exitTime = new Date();
        const fee = this.computeFee(
            ticket.entryTime,
            exitTime,
            spot.vehicleType
        );

        this.spots.releaseSpot(spot.spotId);

        return { fee, exitTime, ticket };
    }
}

export default ParkingLotService;
