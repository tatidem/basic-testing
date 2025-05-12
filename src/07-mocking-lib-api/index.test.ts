import axios, { AxiosInstance } from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('lodash', () => ({
  throttle: <T extends (...args: unknown[]) => unknown>(fn: T) => fn,
}));

jest.mock('axios');

describe('throttledGetDataFromApi', () => {
  let mockedAxiosInstance: jest.Mocked<AxiosInstance>;

  beforeEach(() => {
    mockedAxiosInstance = {
      get: jest.fn().mockResolvedValue({ data: 'mock response' }),
    } as unknown as jest.Mocked<AxiosInstance>;

    (axios.create as jest.Mock).mockReturnValue(mockedAxiosInstance);
  });

  test('should create instance with provided base url', async () => {
    await throttledGetDataFromApi('/example-path');

    expect(axios.create).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    const testPath = '/test-url';

    await throttledGetDataFromApi(testPath);

    expect(mockedAxiosInstance.get).toHaveBeenCalledWith(testPath);
  });

  test('should return response data', async () => {
    const result = await throttledGetDataFromApi('/data-path');

    expect(result).toBe('mock response');
  });
});
