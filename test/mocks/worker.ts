import { WORKER } from '../../src/worker/worker';

const mockPiscinaRun = jest.fn();
const mockPiscina = {
  run: mockPiscinaRun,
};

// Create a mock provider
export const mockPiscinaProvider = {
  provide: WORKER,
  useValue: mockPiscina,
};
