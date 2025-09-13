export enum VehicleType {
    BIKE = "BIKE",
    CAR = "CAR",
    TRUCK = "TRUCK",
}
class Vehicle {
    constructor(
        public vehicleNumber: string,
        public vehicleType: VehicleType
    ) {}
}
export default Vehicle;
