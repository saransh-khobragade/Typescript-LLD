import Fare from "./Fare";
class NormalFareImpl implements Fare {
    calculateFare(pickupId: string, dropId: string): number {
        return 120;
    }
}
export default NormalFareImpl;
