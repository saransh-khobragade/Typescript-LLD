import Spot from "./Spot";

import { VehicleType } from "../Vehicle";

// OCP & LSP: Open for extension, closed for modification - CarSpot extends Spot without changing base behavior
class CarSpot extends Spot {
    constructor(id: string, dist: Record<string, number> = {}) {
        super(id, VehicleType.CAR, dist);
    }
}
export default CarSpot;
