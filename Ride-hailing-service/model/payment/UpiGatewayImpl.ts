import PaymentGateway from "./PaymentGateway";

class UpiGatewayImpl implements PaymentGateway {
    intiatePayment(rideId: string, amount: number): Boolean {
        return true;
    }
}
export default UpiGatewayImpl;
