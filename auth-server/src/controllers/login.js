import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../config";
import UserMaxLoginTries from "../errors/user-max-login-tries";
import UserPasswordMismatch from "../errors/user-password-mismatch";
import User from "../models/user";

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user.loginAttempts >= config.MAX_LOGIN_ATTEMPTS) {
    const cooldownDate = new Date();
    cooldownDate.setDate(
      user.lastFailedLogin.getTime() + config.LOGIN_COOLDOWN_IN_MINUTES * 60000
    );
    const now = new Date();

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

    const token = jwt.sign({ id: user.id }, process.env.TOKEN_PRIVATE_KEY, {
      algorithm: "RS256",
      expiresIn: `${config.TOKEN_EXPIRATION_IN_MINUTES}m`,
    });

    const refreshToken = jwt.sign(
      { id: user.id },
      process.env.REFRESH_PRIVATE_KEY,
      {
        algorithm: "RS256",
        expiresIn: `${config.REFRESH_EXPIRATION_IN_MINUTES}m`,
      }
    );

    res.cookie("Authorization", token, config.COOKIE_OPTIONS);
    res.cookie("Refresh", refreshToken, config.COOKIE_OPTIONS);
    res.json({
      access_token_expires_second: config.TOKEN_EXPIRATION_IN_MINUTES * 1000, 
      refresh_token_expires_second: config.REFRESH_EXPIRATION_IN_MINUTES * 1000,
      success: true 
    });
  }
};

export default login;
