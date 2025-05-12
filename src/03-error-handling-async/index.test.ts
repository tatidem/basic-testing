import {
  resolveValue,
  throwError,
  throwCustomError,
  MyAwesomeError,
  rejectCustomError,
} from './index';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    const testValue = 'test value';
    const result = await resolveValue(testValue);
    expect(result).toBe(testValue);
  });

  test('should resolve with different types', async () => {
    const testCases = [
      { value: 42, expected: 42 },
      { value: null, expected: null },
      { value: { key: 'value' }, expected: { key: 'value' } },
      { value: undefined, expected: undefined },
    ];

    for (const { value, expected } of testCases) {
      await expect(resolveValue(value)).resolves.toStrictEqual(expected);
    }
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    const testMessage = 'Test error message';
    expect(() => throwError(testMessage)).toThrow(testMessage);
  });

  test('should throw error with default message if message is not provided', () => {
    expect(() => throwError()).toThrow('Oops!');
  });

  test('should throw an instance of Error', () => {
    expect(() => throwError()).toThrow(Error);
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    expect(() => throwCustomError()).toThrow(MyAwesomeError);
  });

  test('should throw error with specific message', () => {
    expect(() => throwCustomError()).toThrow(
      'This is my awesome custom error!',
    );
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    await expect(rejectCustomError()).rejects.toThrow(MyAwesomeError);
  });

  test('should reject with specific error message', async () => {
    await expect(rejectCustomError()).rejects.toThrow(
      'This is my awesome custom error!',
    );
  });

  test('should be an async function that rejects', async () => {
    const result = rejectCustomError();
    expect(result).toBeInstanceOf(Promise);
    await expect(result).rejects.toBeInstanceOf(MyAwesomeError);
  });
});
