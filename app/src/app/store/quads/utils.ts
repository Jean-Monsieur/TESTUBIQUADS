import Quad from '../../types/quad';

export const generateDroneID = (q: Pick<Quad, 'manufacturer' | 'model'>) => `${q.manufacturer}|${q.model}`;
