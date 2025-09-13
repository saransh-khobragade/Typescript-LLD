export enum VehicleType {
    BIKE = "BIKE",
    CAR = "CAR",
    TRUCK = "TRUCK",
}
// SRP: Single responsibility - represents vehicle entity with type and identification
class Vehicle {
    constructor(
        public vehicleNumber: string,
        public vehicleType: VehicleType
    ) {}
}
export default Vehicle;
