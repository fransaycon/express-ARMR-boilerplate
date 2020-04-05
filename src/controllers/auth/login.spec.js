import casual from 'casual';
import bcrypt from 'bcrypt';
import User from '../../models/user';
import login from './login';
import UserPasswordMismatch from '../../errors/auth/user-password-mismatch';
import config from '../../config';
import UserMaxLoginTries from '../../errors/auth/user-max-login-tries';

describe('Login Controller', () => {
  const userMock = {
    login: jest.fn(),
    failLogin: jest.fn(),
    lastFailedLogin: casual.moment.toDate(),
    loginAttempts: 0,
  };
  const reqMock = {
    body: {
      email: casual.email,
      password: casual.password,
    },
  };
  const resMock = {
    send: jest.fn(),
  };
  const now = casual.moment.toDate();

  beforeEach(() => {
    jest.spyOn(Date, 'now').mockReturnValue(now);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be able to login properly', async (done) => {
    jest.spyOn(bcrypt, 'compare').mockReturnValue(true);
    jest.spyOn(User, 'findOne').mockReturnValue(Promise.resolve(userMock));

    await login(reqMock, resMock);

    expect(resMock.send).toHaveBeenCalledTimes(1);
    expect(userMock.login).toHaveBeenCalledTimes(1);

    done();
  });

  it('should throw an error when password does not match', async (done) => {
    jest.spyOn(bcrypt, 'compare').mockReturnValue(false);
    jest.spyOn(User, 'findOne').mockReturnValue(Promise.resolve(userMock));

    try {
      await login(reqMock, resMock);
    } catch (error) {
      expect(error instanceof UserPasswordMismatch).toBeTruthy();
      expect(userMock.failLogin).toHaveBeenCalledTimes(1);
    }

    done();
  });

  it('should throw an error when user exceeded login attempts while in cooldown period', async (done) => {
    const updatedUserMock = {
      ...userMock,
      loginAttempts: config.MAX_LOGIN_ATTEMPTS + 1,
      lastFailedLogin: now,
    };
    jest.spyOn(User, 'findOne').mockReturnValue(Promise.resolve(updatedUserMock));

    try {
      await login(reqMock, resMock);
    } catch (error) {
      expect(error instanceof UserMaxLoginTries).toBeTruthy();
    }

    done();
  });

  it('should login successfully when user exceeded login attempts outside cooldown period', async (done) => {
    const updatedUserMock = {
      ...userMock,
      loginAttempts: config.MAX_LOGIN_ATTEMPTS + 1,
      lastFailedLogin: new Date(
        now.getTime() - ((config.LOGIN_COOLDOWN_IN_MINUTES + 1) * 60000),
      ),
    };
    jest.spyOn(User, 'findOne').mockReturnValue(Promise.resolve(updatedUserMock));
    jest.spyOn(bcrypt, 'compare').mockReturnValue(true);

    await login(reqMock, resMock);

    expect(userMock.login).toHaveBeenCalledTimes(1);
    expect(resMock.send).toHaveBeenCalledTimes(1);

    done();
  });
});
