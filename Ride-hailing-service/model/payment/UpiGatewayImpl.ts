import PaymentGateway from "./PaymentGateway";

// Strategy Pattern: Concrete implementation of payment strategy
class UpiGatewayImpl implements PaymentGateway {
    intiatePayment(rideId: string, amount: number): Boolean {
        return true;
    }
}
export default UpiGatewayImpl;
