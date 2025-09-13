import Driver from "../user/Driver";
import DriverAssignment from "./DriverAssignment";

class DriverAssignmentByQuadrantImpl implements DriverAssignment {
    findNearestDriver(pickupLocation: string): Driver {
        //returning nearest driver
        return new Driver("test", "1279172719", "driver", "JGKUGJH", "SWIFT");
    }
}

export default DriverAssignmentByQuadrantImpl;
