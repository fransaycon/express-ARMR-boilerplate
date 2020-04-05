import bcrypt from 'bcrypt';
import config from '../../config';
import UserMaxLoginTries from '../../errors/auth/user-max-login-tries';
import UserPasswordMismatch from '../../errors/auth/user-password-mismatch';
import User from '../../models/user';

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user.loginAttempts >= config.MAX_LOGIN_ATTEMPTS) {
    const cooldownDate = new Date(
      user.lastFailedLogin.getTime()
      + config.LOGIN_COOLDOWN_IN_MINUTES * 60000,
    );
    const now = Date.now();

    if (now <= cooldownDate) {
      throw new UserMaxLoginTries();
    }
  }

  const passwordMatched = await bcrypt.compare(password, user.password);
  if (!passwordMatched) {
    await user.failLogin();
    throw new UserPasswordMismatch();
  } else {
    await user.login();
    res.send({ success: true });
  }
};

export default login;
