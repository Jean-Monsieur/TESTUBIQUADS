import Postion from './position';

export enum DeliveryStatus {
    PENDING,
    IN_PROGRESS,
    COMPLETED
}

type Delivery = {
    id: number;
    name: string;
    destination: Postion;
    status: DeliveryStatus;
};

export default Delivery;
