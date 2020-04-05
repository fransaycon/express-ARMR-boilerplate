import casual from 'casual';
import User from './user';
import { connectTestDatabase, clearTestDatabase, closeTestDatabase } from '../lib/in-memory-db-handler';

describe('User model', () => {
  const userProperties = {
    email: casual.email,
    password: casual.password,
  };
  let user = null;
  beforeAll(async () => {
    await connectTestDatabase();
  });
  const now = casual.moment.toDate();

  beforeEach(async () => {
    jest.spyOn(Date, 'now').mockReturnValue(now);
    await User.create(userProperties);
    user = await User.findOne({ email: userProperties.email });
  });

  afterEach(async () => {
    await clearTestDatabase();
    jest.clearAllMocks();
  });

  afterAll(async () => {
    await closeTestDatabase();
  });

  it('should be created properly', async (done) => {
    expect(user.email).toBe(userProperties.email);
    expect(user.password).toBe(userProperties.password);
    expect(user.createdAt).toBeTruthy();
    expect(user.updatedAt).toBeTruthy();
    expect(user.loginAttempts).toBe(0);
    expect(user.lastLoggedIn).toBeFalsy();

    done();
  });

  it('should have a method login that will update user details', async (done) => {
    await user.login();

    expect(user.lastLoggedIn.getMonth()).toBe(now.getMonth());
    expect(user.lastLoggedIn.getYear()).toBe(now.getYear());
    expect(user.lastLoggedIn.getDay()).toBe(now.getDay());
    expect(user.loginAttempts).toBe(0);

    done();
  });

  it('should have a method failLogin that will update user details', async (done) => {
    await user.failLogin();

    expect(user.lastFailedLogin.getMonth()).toBe(now.getMonth());
    expect(user.lastFailedLogin.getYear()).toBe(now.getYear());
    expect(user.lastFailedLogin.getDay()).toBe(now.getDay());
    expect(user.loginAttempts).toBe(1);

    await user.failLogin();
    expect(user.loginAttempts).toBe(2);

    done();
  });

  it('should have a method login that will reset login attempts to 0', async (done) => {
    await user.failLogin();
    await user.login();

    expect(user.loginAttempts).toBe(0);
    done();
  });
});
