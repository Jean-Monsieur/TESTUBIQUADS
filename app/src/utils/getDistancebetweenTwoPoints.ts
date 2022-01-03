import Postion from '../app/types/position';

const getDistancebetweenTwoPoints = (p1: Postion, p2: Postion): number => {
    const x2x1 = Math.pow(p2.x - p1.x, 2);
    const y2y1 = Math.pow(p2.y - p1.y, 2);
    return Math.sqrt(x2x1 + y2y1);
};

export default getDistancebetweenTwoPoints;
