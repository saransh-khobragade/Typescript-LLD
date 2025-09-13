enum STATUS {
    "REQUESTED",
    "ACCEPTED",
}
class Ride {
    private rideId: string;
    private riderId: string;
    private driverId: string;
    private pickupLocationId: string;
    private dropLocationId: string;
    private status: STATUS;
    private fare: number;

    constructor(
        riderId: string,
        pickupLocationId: string,
        dropLocationId: string
    ) {
        this.rideId = "uuid";
        this.status = STATUS.REQUESTED;
        this.fare = 0;
        this.riderId = riderId;
        this.pickupLocationId = pickupLocationId;
        this.dropLocationId = dropLocationId;
    }
    getRideId() {
        return this.rideId;
    }
    getRide() {
        this.riderId;
        this.rideId;
        this.driverId;
        this.pickupLocationId;
        this.dropLocationId;
        this.status;
        this.fare;
    }
    getPickupLocationId(): string {
        return this.pickupLocationId;
    }
    getDropLocationId(): string {
        return this.dropLocationId;
    }
    updateDriver(driverId: string) {
        this.driverId = driverId;
    }
}

export default Ride;
