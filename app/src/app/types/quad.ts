export enum DroneStatus {
    IDLE,
    CHARGING,
    ACTIVE,
    CRASHED,
    DONE
}

type Quad = {
    manufacturer: string;
    model: string;
    maxFlightTime: number;
    charge: number;
    status: DroneStatus;
};
export default Quad;
