// ISP: Focused interface with single responsibility for fare calculation
// Strategy Pattern: Defines fare calculation algorithm interface
interface Fare {
    calculateFare(pickupLocationId: string, dropLocationId: string): number;
}
export default Fare;
