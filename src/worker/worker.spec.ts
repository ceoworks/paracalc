import { Test, TestingModule } from '@nestjs/testing';
import { WORKER, Worker } from './worker';
import Piscina from 'piscina';

describe('Worker', () => {
  let provider: Piscina;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Worker],
    }).compile();

    provider = module.get<Piscina>(WORKER);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
