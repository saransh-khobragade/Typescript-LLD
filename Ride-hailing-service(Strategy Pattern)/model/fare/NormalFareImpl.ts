import Fare from "./Fare";
// Strategy Pattern: Concrete implementation of fare calculation strategy
class NormalFareImpl implements Fare {
    calculateFare(pickupId: string, dropId: string): number {
        return 120;
    }
}
export default NormalFareImpl;
