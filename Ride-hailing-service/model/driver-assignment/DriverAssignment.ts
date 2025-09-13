import Driver from "../user/Driver";

// ISP: Focused interface with single responsibility for driver assignment
// Strategy Pattern: Defines driver assignment algorithm interface
interface DriverAssignment {
    findNearestDriver(pickupLocation: string): Driver;
}
export default DriverAssignment;
