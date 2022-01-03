import Quad from '../app/types/quad';

const getQuadTimeLeft = (quad: Quad) => (quad.charge * quad.maxFlightTime) / 100;
