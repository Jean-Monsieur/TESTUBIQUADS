import { PositionType } from '../../types/position';
import Station from '../../types/station';

const stations: Station[] = [
    {
        id: 1,
        name: 'Station 1',
        capacity: 10,
        location: { x: 1, y: 1, type: PositionType.STATION },
        assignedQuads: []
    },
    {
        id: 2,
        name: 'Station 2',
        capacity: 10,
        location: { x: 5, y: 5, type: PositionType.STATION },
        assignedQuads: []
    },
    {
        id: 3,
        name: 'Station 3',
        capacity: 10,
        location: { x: 10, y: 10, type: PositionType.STATION },
        assignedQuads: []
    }
];

export default stations;
