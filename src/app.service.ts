import { Inject, Injectable } from '@nestjs/common';
import Piscina from 'piscina';
import { WORKER } from './worker/worker';

@Injectable()
export class AppService {
  constructor(@Inject(WORKER) private worker: Piscina) {}

  async calculateExpression(exp: string): Promise<number> {
    const result = (await this.worker.run(exp)) as unknown as number;
    if (typeof result === 'string') {
      throw new Error(result);
    }
    return result;
  }
}
