import { expressionsToTest } from '../../test/expressions';
import evaluateExpression from './evaluateExpression';

describe('evaluateExpression', () => {
  it.each(expressionsToTest)(
    'should evaluate expression ${$a} correctly',
    async ({ a, expected }) => {
      expect(evaluateExpression(a)).toEqual(expected);
    },
  );
});
