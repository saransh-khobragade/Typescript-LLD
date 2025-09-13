import Spot from "./Spot";

import { VehicleType } from "../Vehicle";

class CarSpot extends Spot {
    constructor(id: string, dist: Record<string, number> = {}) {
        super(id, VehicleType.CAR, dist);
    }
}
export default CarSpot;
