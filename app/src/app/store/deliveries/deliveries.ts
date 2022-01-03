import Delivery, { DeliveryStatus } from '../../types/delivery';
import { PositionType } from '../../types/position';

const deliveries: Delivery[] = [
    {
        id: 1,
        name: 'Delivery 1',
        destination: { x: 5, y: 8, type: PositionType.DELIVERY },
        status: DeliveryStatus.PENDING
    },
    {
        id: 2,
        name: 'Delivery 2',
        destination: { x: 4, y: 2, type: PositionType.DELIVERY },
        status: DeliveryStatus.PENDING
    },
    {
        id: 3,
        name: 'Delivery 3',
        destination: { x: 3, y: 9, type: PositionType.DELIVERY },
        status: DeliveryStatus.PENDING
    }
];

export default deliveries;
