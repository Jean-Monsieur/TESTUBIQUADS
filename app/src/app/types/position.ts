export enum PositionType {
    STATION,
    DELIVERY
}

type Postion = {
    x: number;
    y: number;
    type: PositionType;
};

export default Postion;
