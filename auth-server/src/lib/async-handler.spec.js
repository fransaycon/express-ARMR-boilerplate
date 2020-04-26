import asyncHandler from './async-handler';

describe('lib/async-handler', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should wrap a function under a promise and resolve a callback.', async (done) => {
    const callback = jest.fn();

    const callAsyncFunction = asyncHandler(callback);
    await callAsyncFunction();

    expect(callback).toHaveBeenCalledTimes(1);
    done();
  });

  it('should wrap a function under a promise and reject if callback throws.', async (done) => {
    const callback = () => {
      throw new Error();
    };
    const callAsyncFunction = asyncHandler(callback);

    try {
      await callAsyncFunction();
    } catch (error) {
      expect(error instanceof Error).toBeTruthy();
    }

    done();
  });
});
