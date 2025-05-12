import { simpleCalculator, Action, RawCalculatorInput } from './index';

describe('simpleCalculator', () => {
  describe('valid operations', () => {
    const validCases = [
      {
        description: 'should add two numbers',
        input: { a: 5, b: 3, action: Action.Add },
        expected: 8,
      },
      {
        description: 'should subtract two numbers',
        input: { a: 10, b: 4, action: Action.Subtract },
        expected: 6,
      },
      {
        description: 'should multiply two numbers',
        input: { a: 7, b: 2, action: Action.Multiply },
        expected: 14,
      },
      {
        description: 'should divide two numbers',
        input: { a: 15, b: 3, action: Action.Divide },
        expected: 5,
      },
      {
        description: 'should exponentiate two numbers',
        input: { a: 2, b: 3, action: Action.Exponentiate },
        expected: 8,
      },
      {
        description: 'should handle negative numbers in addition',
        input: { a: -5, b: -3, action: Action.Add },
        expected: -8,
      },
      {
        description: 'should handle negative numbers in multiplication',
        input: { a: -2, b: 3, action: Action.Multiply },
        expected: -6,
      },
      {
        description: 'should handle division by zero',
        input: { a: 5, b: 0, action: Action.Divide },
        expected: Infinity,
      },
    ];

    test.each(validCases)('$description', ({ input, expected }) => {
      expect(simpleCalculator(input)).toBe(expected);
    });
  });

  describe('invalid inputs', () => {
    const invalidCases = [
      {
        description: 'should return null for invalid action',
        input: { a: 2, b: 3, action: '%' },
      },
      {
        description: 'should return null for invalid first argument',
        input: { a: '2', b: 3, action: Action.Add },
      },
      {
        description: 'should return null for invalid second argument',
        input: { a: 2, b: '3', action: Action.Add },
      },
      {
        description: 'should return null for both invalid arguments',
        input: { a: '2', b: '3', action: Action.Add },
      },
    ];

    test.each(invalidCases)('$description', ({ input }) => {
      expect(simpleCalculator(input as RawCalculatorInput)).toBeNull();
    });
  });
});
