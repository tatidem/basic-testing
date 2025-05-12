import {
  getBankAccount,
  InsufficientFundsError,
  TransferFailedError,
  SynchronizationFailedError,
} from '.';
import { random } from 'lodash';

jest.mock('lodash', () => ({
  random: jest.fn(),
}));

describe('BankAccount', () => {
  let account: ReturnType<typeof getBankAccount>;
  const initialBalance = 100;

  beforeEach(() => {
    account = getBankAccount(initialBalance);
    jest.clearAllMocks();
  });

  test('should create account with initial balance', () => {
    expect(account.getBalance()).toBe(initialBalance);
  });

  test('should throw InsufficientFundsError when withdrawing more than balance', () => {
    const withdrawAmount = initialBalance + 1;
    expect(() => account.withdraw(withdrawAmount)).toThrow(
      new InsufficientFundsError(initialBalance),
    );
    expect(account.getBalance()).toBe(initialBalance);
  });

  test('should throw error when transferring more than balance', () => {
    const otherAccount = getBankAccount(0);
    const transferAmount = initialBalance + 1;
    expect(() => account.transfer(transferAmount, otherAccount)).toThrow(
      new InsufficientFundsError(initialBalance),
    );
    expect(account.getBalance()).toBe(initialBalance);
    expect(otherAccount.getBalance()).toBe(0);
  });

  test('should throw error when transferring to the same account', () => {
    expect(() => account.transfer(10, account)).toThrow(
      new TransferFailedError(),
    );
    expect(account.getBalance()).toBe(initialBalance);
  });

  test('should deposit money', () => {
    const depositAmount = 50;
    account.deposit(depositAmount);
    expect(account.getBalance()).toBe(initialBalance + depositAmount);
  });

  test('should withdraw money', () => {
    const withdrawAmount = 50;
    account.withdraw(withdrawAmount);
    expect(account.getBalance()).toBe(initialBalance - withdrawAmount);
  });

  test('should transfer money', () => {
    const otherAccount = getBankAccount(0);
    const transferAmount = 50;
    account.transfer(transferAmount, otherAccount);
    expect(account.getBalance()).toBe(initialBalance - transferAmount);
    expect(otherAccount.getBalance()).toBe(transferAmount);
  });

  describe('fetchBalance', () => {
    test('should return number if request did not fail', async () => {
      const mockBalance = 75;
      (random as jest.Mock)
        .mockReturnValueOnce(mockBalance)
        .mockReturnValueOnce(1);
      await expect(account.fetchBalance()).resolves.toBe(mockBalance);
    });

    test('should return null if request failed', async () => {
      (random as jest.Mock).mockReturnValueOnce(0).mockReturnValueOnce(0);
      await expect(account.fetchBalance()).resolves.toBeNull();
    });
  });

  describe('synchronizeBalance', () => {
    test('should set new balance if fetchBalance returned number', async () => {
      const newBalance = 75;
      (random as jest.Mock)
        .mockReturnValueOnce(newBalance)
        .mockReturnValueOnce(1);
      await account.synchronizeBalance();
      expect(account.getBalance()).toBe(newBalance);
    });

    test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
      (random as jest.Mock).mockReturnValueOnce(0).mockReturnValueOnce(0);
      await expect(account.synchronizeBalance()).rejects.toThrow(
        new SynchronizationFailedError(),
      );
      expect(account.getBalance()).toBe(initialBalance);
    });
  });
});
