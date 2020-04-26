import casual from "casual";
import errorMiddleware from "./error";

describe("Error Middleware", () => {
  it("should send the error's status and message", async (done) => {
    const error = {
      statusCode: casual.integer(0, 10),
      message: casual.string,
    };
    const resMock = {
      headersSent: false,
      status: jest.fn(),
      json: jest.fn(),
    };

    await errorMiddleware(error, null, resMock, null);

    expect(resMock.status).toHaveBeenCalledWith(error.statusCode);
    expect(resMock.json).toHaveBeenCalledWith({ message: error.message });
    done();
  });

  it("should call next when headersSent", async (done) => {
    const error = {
      statusCode: casual.integer(0, 10),
      message: casual.string,
    };
    const resMock = {
      headersSent: true,
    };
    const next = jest.fn();

    await errorMiddleware(error, null, resMock, next);
    expect(next).toHaveBeenCalledWith(error);
    done();
  });
});
