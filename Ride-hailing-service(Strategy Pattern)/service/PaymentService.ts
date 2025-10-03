import PaymentGateway from "../model/payment/PaymentGateway";
import UpiGatewayImpl from "../model/payment/UpiGatewayImpl";

// SRP: Single responsibility - handles payment processing operations
class PaymentService {
    getPaymentGateway(paymentType: string): PaymentGateway {
        switch (paymentType) {
            case "UPI": {
                return new UpiGatewayImpl();
            }
            default:
                return new UpiGatewayImpl();
        }
    }
    intiatePayment(paymentType: string, rideId: string, amount: number) {
        const paymentGateway = this.getPaymentGateway(paymentType);
        paymentGateway.intiatePayment(rideId, amount);
    }
}
export default PaymentService;
