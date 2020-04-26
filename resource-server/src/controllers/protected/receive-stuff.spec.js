import casual from "casual";
import receiveStuff from "./receive-stuff";

describe("Receive Stuff controller", () => {
  const reqMock = {
    user: { email: casual.email },
  };

  const resMock = {
    json: jest.fn(),
  };

  it("should send a response with request user email", () => {
    receiveStuff(reqMock, resMock);
    expect(resMock.json).toHaveBeenCalledWith({
      secret: `You have accessed a protected route, user with email: ${reqMock.user.email}`,
    });
  });
});
