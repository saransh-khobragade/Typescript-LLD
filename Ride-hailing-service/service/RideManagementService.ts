import Fare from "../model/fare/Fare";
import NormalFareImpl from "../model/fare/NormalFareImpl";
import Ride from "../model/ride/Ride";
import Driver from "../model/user/Driver";
import DriverAssignmnetService from "./DriverAssignmnetService";
import PaymentService from "./PaymentService";

// SRP Violation: Multiple responsibilities - ride creation, fare calculation, payment processing
class RideManagementService {
    private driverAssignmnetService: DriverAssignmnetService;
    private paymentService: PaymentService;
    private rides = new Map<string, Ride>();
    private fare: Fare;
    constructor() {
        this.driverAssignmnetService = new DriverAssignmnetService();
        this.fare = new NormalFareImpl();
        this.paymentService = new PaymentService();
    }
    createRide(riderId: string, pickeUpId: string, dropId: string) {
        const ride: Ride = new Ride(riderId, pickeUpId, dropId);
        const driver: Driver =
            this.driverAssignmnetService.findDriver(pickeUpId);
        ride.updateDriver(driver.getId());
        this.rides[riderId] = ride;
        return ride;
    }
    getRide(riderId: string): Ride {
        const ride = this.rides[riderId];
        if (!ride) throw new Error("Ride not found");
        return ride;
    }
    endRide(riderId: string) {
        const ride = this.getRide(riderId);
        const amount = this.fare.calculateFare(
            ride.getPickupLocationId(),
            ride.getDropLocationId()
        );
        this.paymentService.intiatePayment("UPI", riderId, amount);
    }
}
export default RideManagementService;
