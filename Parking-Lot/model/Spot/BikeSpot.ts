import Spot from "./Spot";
import { VehicleType } from "../Vehicle";

// OCP & LSP: Open for extension, closed for modification - BikeSpot extends Spot without changing base behavior
class BikeSpot extends Spot {
    constructor(id: string, dist: Record<string, number> = {}) {
        super(id, VehicleType.BIKE, dist);
    }
}

export default BikeSpot;
