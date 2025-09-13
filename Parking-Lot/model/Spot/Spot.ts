import Vehicle, { VehicleType } from "../Vehicle";

class Spot {
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
            throw new Error(
                `Vehicle ${vehicle.vehicleType} not allowed on ${this.vehicleType} spot`
            );
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
export default Spot;
