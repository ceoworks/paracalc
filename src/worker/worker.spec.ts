import { Test, TestingModule } from '@nestjs/testing';
import { WORKER, Worker } from './worker';
import Piscina from 'piscina';
import { resolve } from 'path';
import { expressionsToTest } from '../../test/expressions';

jest.mock('path', () => ({
  resolve: jest.fn(),
}));

describe('Worker', () => {
  let provider: Piscina;

  beforeEach(async () => {
    (resolve as jest.Mock).mockReturnValue('test/mocks/evaluateExpression.js');
    const module: TestingModule = await Test.createTestingModule({
      providers: [Worker],
    }).compile();

    provider = module.get<Piscina>(WORKER);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });

  it.each(expressionsToTest)(
    'should evaluate expression ${$a} correctly',
    async ({ a, expected }) => {
      expect(await provider.run(a)).toEqual(expected);
    },
  );
});
