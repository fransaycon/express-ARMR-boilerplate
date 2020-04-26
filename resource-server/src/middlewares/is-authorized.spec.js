import casual from "casual";
import jwt from "jsonwebtoken";
import isAuthorized from "./is-authorized";
import User from "../models/user";
import UserForbidden from "../errors/auth/user-forbidden";
import UserNotFound from "../errors/auth/user-not-found";

describe("isAuthorized Middleware", () => {
  let reqMock = null;
  const nextMock = jest.fn();
  const TOKEN_PUBLIC_KEY = casual.word;

  beforeEach(() => {
    reqMock = {
      cookies: {
        Authorization: casual.string,
      },
    };
    process.env.TOKEN_PUBLIC_KEY = TOKEN_PUBLIC_KEY;
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.resetModules();
  });

  it("should populate req.user when cookie is valid.", async (done) => {
    const fakeEmail = casual.email;
    const id = casual.word;

    const jwtSpy = jest.spyOn(jwt, "verify").mockReturnValue({ id });
    const userSpy = jest.spyOn(User, "findById").mockReturnValue(
      Promise.resolve({
        email: fakeEmail,
      })
    );
    const token = reqMock.cookies.Authorization.replace("Bearer ", "");

    await isAuthorized(reqMock, null, nextMock);
    expect(jwtSpy).toHaveBeenCalledWith(token, TOKEN_PUBLIC_KEY, {
      algorithms: "RS256",
    });
    expect(userSpy).toHaveBeenCalledWith(id);
    expect(nextMock).toHaveBeenCalledTimes(1);
    expect(reqMock.user).toStrictEqual({ email: fakeEmail });
    done();
  });

  it("should throw a forbidden error when cookie lacks Authorization key", async (done) => {
    delete reqMock.cookies.Authorization;
    try {
      await isAuthorized(reqMock, null, nextMock);
    } catch (error) {
      expect(error instanceof UserForbidden).toBeTruthy();
    }
    done();
  });

  it("should throw a forbidden error when jwt is invalid", async (done) => {
    jest.spyOn(jwt, "verify").mockReturnValue(() => {
      throw new Error();
    });

    try {
      await isAuthorized(reqMock, null, nextMock);
    } catch (error) {
      expect(error instanceof UserForbidden).toBeTruthy();
    }
    done();
  });

  it("should throw a forbidden error when Authorization value is invalid", async (done) => {
    reqMock.cookies.Authorization = casual.string;
    try {
      await isAuthorized(reqMock, null, nextMock);
    } catch (error) {
      expect(error instanceof UserForbidden).toBeTruthy();
    }
    done();
  });

  it("should throw a forbidden error when user database fetching throws an error", async (done) => {
    jest.spyOn(jwt, "verify").mockReturnValue({ id: casual.string });
    jest.spyOn(User, "findById").mockReturnValue(() => {
      throw new Error();
    });
    try {
      await isAuthorized(reqMock, null, nextMock);
    } catch (error) {
      expect(error instanceof UserForbidden).toBeTruthy();
    }
    done();
  });

  it("should throw a not found error when no user was fetched from db", async (done) => {
    jest.spyOn(jwt, "verify").mockReturnValue({ id: casual.string });
    jest.spyOn(User, "findById").mockReturnValue(null);
    try {
      await isAuthorized(reqMock, null, nextMock);
    } catch (error) {
      expect(error instanceof UserNotFound).toBeTruthy();
    }
    done();
  });
});
