export const expressionsToTest = [
  {
    a: '2+2',
    expected: 4,
  },
  {
    a: '(1-1)*2+3*(1-3+4)+10/2',
    expected: 11,
  },
  {
    a: '(1-1)*2+3/(4-4)+10/2',
    expected: 'Cannot divide by zero',
  },
];
