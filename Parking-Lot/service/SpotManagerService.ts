import Spot from "../model/Spot/Spot";
import { VehicleType } from "../model/Vehicle";

// SRP: Single responsibility - manages collection of parking spots and spot allocation logic
class SpotManagerService {
    private spots: Spot[] = [];

    addSpot(spot: Spot): void {
        this.spots.push(spot);
    }

    getSpot(id: string): Spot | undefined {
        return this.spots.find((s) => s.spotId === id);
    }

    releaseSpot(id: string): void {
        const s = this.getSpot(id);
        if (!s) throw new Error(`Spot ${id} not found`);
        s.removeVehicle();
    }

    nearestFree(type: VehicleType, entryGateId: string): Spot | undefined {
        let best: Spot | undefined;
        let bestDist = Number.POSITIVE_INFINITY;
        for (const s of this.spots) {
            if (!s.isFree) continue;
            if (s.vehicleType !== type) continue;
            const d = s.distanceFromGate(entryGateId);
            if (d < bestDist) {
                best = s;
                bestDist = d;
            }
        }
        // Strategy Pattern: Algorithm for finding nearest available spot based on distance
        return best;
    }
}
export default SpotManagerService;
