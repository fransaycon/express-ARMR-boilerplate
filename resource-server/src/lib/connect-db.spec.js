import mongoose from "mongoose";
import connectDb from "./connect-db";

describe("lib/connect-db", () => {
  it("should create a mongoose connection", async (done) => {
    const mongooseConnectSpy = jest
      .spyOn(mongoose, "connect")
      .mockReturnValue();

    await connectDb();
    expect(mongooseConnectSpy).toHaveBeenCalledTimes(1);
    done();
  });
});
