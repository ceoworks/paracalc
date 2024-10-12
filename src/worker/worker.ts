import { Provider } from '@nestjs/common';
import { resolve } from 'path';
import Piscina from 'piscina';

export const WORKER = 'WORKER';
export const Worker: Provider = {
  provide: WORKER,
  useFactory: () => {
    return new Piscina({
      filename: resolve(__dirname, '../lib/evaluateExpression.js'),
    });
  },
};
