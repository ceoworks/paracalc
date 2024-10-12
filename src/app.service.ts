import { Inject, Injectable } from '@nestjs/common';
import Piscina from 'piscina';
import { WORKER } from './worker/worker';

@Injectable()
export class AppService {
  constructor(@Inject(WORKER) private worker: Piscina) {}

  calculateExpression(exp: string): number {
    return this.worker.run(exp) as unknown as number;
  }
}
