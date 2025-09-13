// ISP: Focused interface with single responsibility for payment processing
// Strategy Pattern: Defines payment algorithm interface
interface PaymentGateway {
    intiatePayment(rideId: string, amount: number): Boolean;
}
export default PaymentGateway;
