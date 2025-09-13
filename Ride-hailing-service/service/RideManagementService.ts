import Fare from "../model/fare/Fare";
import NormalFareImpl from "../model/fare/NormalFareImpl";
import Ride from "../model/ride/Ride";
import Driver from "../model/user/Driver";
import DriverAssignmnetService from "./DriverAssignmnetService";

class RideManagementService {
    private driverAssignmnetService: DriverAssignmnetService;
    private rides: Ride[] = [];
    private fare: Fare;
    constructor() {
        this.driverAssignmnetService = new DriverAssignmnetService();
        this.fare = new NormalFareImpl();
    }
    createRide(riderId: string, pickeUpId: string, dropId: string) {
        const ride: Ride = new Ride(riderId, pickeUpId, dropId);
        const driver: Driver =
            this.driverAssignmnetService.findDriver(pickeUpId);
        ride.updateDriver(driver.getId());
        this.rides.push(ride);
        return ride;
    }
    getRide(riderId: string): Ride {
        const ride = this.rides.find((x) => x.getRideId() === riderId);
        if (!ride) throw new Error("Ride not found");
        return ride;
    }
    endRide(riderId: string) {
        const ride = this.getRide(riderId);
        const amount = this.fare.calculateFare(
            ride.getPickupLocationId(),
            ride.getDropLocationId()
        );
    }
}
export default RideManagementService;
