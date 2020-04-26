import receiveStuff from './receive-stuff';

describe('Receive Stuff controller', () => {
  const resMock = {
    json: jest.fn(),
  };

  it('should send a response with request user email', () => {
    receiveStuff(null, resMock);
    expect(resMock.json).toHaveBeenCalledWith({ secret: `You have accessed a public route.` });
  });
});
