import casual from "casual";
import jwt from "jsonwebtoken";
import refresh from "./refresh";
import User from "../models/user";
import config from "../config";
import RefreshForbidden from "../errors/refresh-forbidden";
import RefreshUserMismatch from "../errors/refresh-user-mismatch";
import UserNotFound from "../errors/user-not-found";

describe("Refresh Controller", () => {
  const TOKEN_PRIVATE_KEY = casual.word;
  const token = casual.uuid;
  const userMock = {
    id: casual.uuid,
  };
  const reqMock = {
    cookie: {
      Authorization: casual.word,
      Refresh: casual.word,
    },
  };
  const resMock = {
    json: jest.fn(),
    cookie: jest.fn(),
  };

  beforeEach(() => {
    process.env.TOKEN_PRIVATE_KEY = TOKEN_PRIVATE_KEY;
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.resetModules();
  });

  it("should refresh token successfully", async (done) => {
    jest
      .spyOn(jwt, "verify")
      .mockReturnValue(Promise.resolve({ id: userMock.id }));
    jest.spyOn(jwt, "decode").mockReturnValue({ id: userMock.id });
    jest.spyOn(User, "findById").mockReturnValue(Promise.resolve(userMock));
    const signSpy = jest.spyOn(jwt, "sign").mockReturnValue(token);

    await refresh(reqMock, resMock);

    expect(resMock.cookie).toHaveBeenCalledWith(
      "Authorization",
      token,
      config.COOKIE_OPTIONS
    );
    expect(signSpy).toHaveBeenCalledWith(
      { id: userMock.id },
      TOKEN_PRIVATE_KEY,
      {
        algorithm: "RS256",
        expiresIn: `${config.TOKEN_EXPIRATION_IN_MINUTES}m`,
      }
    );

    done();
  });

  it("should reject invalid authorization cookies", async (done) => {
    jest.spyOn(jwt, "decode").mockImplementation(() => {
      throw new Error();
    });

    try {
      await refresh(reqMock, resMock);
    } catch (error) {
      expect(error instanceof RefreshForbidden).toBeTruthy();
    }

    done();
  });

  it("should reject invalid authorization cookies", async (done) => {
    jest.spyOn(jwt, "verify").mockReturnValue(Promise.reject());

    try {
      await refresh(reqMock, resMock);
    } catch (error) {
      expect(error instanceof RefreshForbidden).toBeTruthy();
    }

    done();
  });

  it("should reject mismatching user data in cookies", async (done) => {
    jest
      .spyOn(jwt, "verify")
      .mockReturnValue(Promise.resolve({ id: userMock.id }));
    jest.spyOn(jwt, "decode").mockReturnValue({ id: casual.uuid });

    try {
      await refresh(reqMock, resMock);
    } catch (error) {
      expect(error instanceof RefreshUserMismatch).toBeTruthy();
    }

    done();
  });

  it("should reject invalid user id in cookies", async (done) => {
    jest
      .spyOn(jwt, "verify")
      .mockReturnValue(Promise.resolve({ id: userMock.id }));
    jest.spyOn(jwt, "decode").mockReturnValue({ id: userMock.id });
    jest.spyOn(User, "findById").mockReturnValue(Promise.resolve(null));

    try {
      await refresh(reqMock, resMock);
    } catch (error) {
      expect(error instanceof UserNotFound).toBeTruthy();
    }

    done();
  });
});
