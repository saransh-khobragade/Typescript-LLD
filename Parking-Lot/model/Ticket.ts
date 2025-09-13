// SRP: Single responsibility - represents parking ticket with entry details
class Ticket {
    constructor(
        public ticketId: string,
        public entryTime: Date,
        public vehicleNumber: string,
        public spotId: string,
        public entryGateId: string
    ) {}
}
export default Ticket;
