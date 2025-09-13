interface PaymentGateway {
    intiatePayment(rideId: string, amount: number): Boolean;
}
export default PaymentGateway;
