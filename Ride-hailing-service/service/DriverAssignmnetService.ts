import DriverAssignment from "../model/driver-assignment/DriverAssignment";
import DriverAssignmentByGridImpl from "../model/driver-assignment/DriverAssignmentByGridImpl";
import Driver from "../model/user/Driver";

class DriverAssignmentService {
    private driverAssignment: DriverAssignment;
    constructor() {
        this.driverAssignment = new DriverAssignmentByGridImpl();
    }
    findDriver(pickupId: string): Driver {
        return this.driverAssignment.findNearestDriver(pickupId);
    }
}
export default DriverAssignmentService;
