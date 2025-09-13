interface Fare {
    calculateFare(pickupLocationId: string, dropLocationId: string): number;
}
export default Fare;
