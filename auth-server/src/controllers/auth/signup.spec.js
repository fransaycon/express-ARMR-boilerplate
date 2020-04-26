import bcrypt from 'bcrypt';
import casual from 'casual';
import signup from './signup';
import User from '../../models/user';
import UserEmailDuplicate from '../../errors/auth/user-email-duplicate';

class MongoDuplicateError extends Error {
  constructor() {
    super();
    this.code = 11000;
    this.keyPattern = { email: 1 };
  }
}

describe('Sign up controller', () => {
  const userMock = {
    create: jest.fn(),
  };
  const reqMock = {
    body: {
      email: casual.email,
      password: casual.password,
    },
  };
  const resMock = {
    json: jest.fn(),
  };

  beforeEach(() => {
    jest.spyOn(bcrypt, 'genSaltSync').mockReturnValue(casual.string);
    jest.spyOn(bcrypt, 'hash').mockReturnValue(Promise.resolve(casual.string));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create user successfully.', async (done) => {
    jest.spyOn(User, 'create').mockReturnValue(Promise.resolve(userMock));

    await signup(reqMock, resMock);
    expect(resMock.json).toHaveBeenCalledTimes(1);

    done();
  });

  it('should throw an error if email already exists', async (done) => {
    jest.spyOn(User, 'create').mockReturnValue(Promise.reject(new MongoDuplicateError()));

    try {
      await signup(reqMock, resMock);
    } catch (error) {
      expect(error instanceof UserEmailDuplicate).toBeTruthy();
    }

    done();
  });
});
