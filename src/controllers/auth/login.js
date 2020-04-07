import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
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
    const token = jwt.sign({ id: user.id }, process.env.PRIVATE_KEY, { algorithm: 'RS256', expiresIn: `${config.JWT_EXPIRATION_IN_DAYS}d` });
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDay() + config.COOKIE_EXPIRATION_IN_DAYS);
    res.cookie('Authorization', `Bearer ${token}`, {
      httpOnly: true,
      expires: expirationDate,
    });
    res.json({ success: true });
  }
};

export default login;
