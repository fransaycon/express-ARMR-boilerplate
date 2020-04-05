import casual from 'casual';
import bcrypt from 'bcrypt';
import User from '../../models/user';
import login from './login';
import UserPasswordMismatch from '../../errors/auth/user-password-mismatch';

describe('Login Controller', () => {
  const userMock = {
    login: jest.fn(),
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

  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(User, 'findOne').mockReturnValue(Promise.resolve(userMock));
  });

  it('should be able to login properly', async (done) => {
    jest.spyOn(bcrypt, 'compare').mockReturnValue(true);

    await login(reqMock, resMock);

    expect(resMock.send).toHaveBeenCalledTimes(1);
    expect(userMock.login).toHaveBeenCalledTimes(1);

    done();
  });

  it('should throw an error when password does not match', async (done) => {
    jest.spyOn(bcrypt, 'compare').mockReturnValue(false);
    try {
      await login(reqMock, resMock);
    } catch (error) {
      expect(error instanceof UserPasswordMismatch).toBeTruthy();
    }

    done();
  });
});
