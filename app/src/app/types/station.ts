import Postion from './position';

type Station = {
    id: number;
    name: string;
    capacity: number;
    assignedQuads: string[];
    location: Postion;
};

export default Station;
