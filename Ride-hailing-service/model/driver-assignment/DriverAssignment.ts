import Driver from "../user/Driver";

interface DriverAssignment {
    findNearestDriver(pickupLocation: string): Driver;
}
export default DriverAssignment;
