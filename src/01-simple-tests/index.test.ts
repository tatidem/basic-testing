import { simpleCalculator, Action, RawCalculatorInput } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const input = { a: 5, b: 3, action: Action.Add };
    const result = simpleCalculator(input);
    expect(result).toBe(8);
  });

  test('should subtract two numbers', () => {
    const input = { a: 10, b: 4, action: Action.Subtract };
    const result = simpleCalculator(input);
    expect(result).toBe(6);
  });

  test('should multiply two numbers', () => {
    const input = { a: 7, b: 2, action: Action.Multiply };
    const result = simpleCalculator(input);
    expect(result).toBe(14);
  });

  test('should divide two numbers', () => {
    const input = { a: 15, b: 3, action: Action.Divide };
    const result = simpleCalculator(input);
    expect(result).toBe(5);
  });

  test('should exponentiate two numbers', () => {
    const input = { a: 2, b: 3, action: Action.Exponentiate };
    const result = simpleCalculator(input);
    expect(result).toBe(8);
  });

  test('should return null for invalid action', () => {
    const input = { a: 2, b: 3, action: '%' };
    const result = simpleCalculator(input);
    expect(result).toBeNull();
  });

  test('should return null for invalid first argument', () => {
    const input = { a: '2', b: 3, action: Action.Add };
    const result = simpleCalculator(input as RawCalculatorInput);
    expect(result).toBeNull();
  });

  test('should return null for invalid second argument', () => {
    const input = { a: 2, b: '3', action: Action.Add };
    const result = simpleCalculator(input as RawCalculatorInput);
    expect(result).toBeNull();
  });

  test('should return null for both invalid arguments', () => {
    const input = { a: '2', b: '3', action: Action.Add };
    const result = simpleCalculator(input as RawCalculatorInput);
    expect(result).toBeNull();
  });

  test('should handle division by zero', () => {
    const input = { a: 5, b: 0, action: Action.Divide };
    const result = simpleCalculator(input);
    expect(result).toBe(Infinity);
  });

  test('should handle negative numbers', () => {
    const addInput = { a: -5, b: -3, action: Action.Add };
    const multiplyInput = { a: -2, b: 3, action: Action.Multiply };

    expect(simpleCalculator(addInput)).toBe(-8);
    expect(simpleCalculator(multiplyInput)).toBe(-6);
  });
});
