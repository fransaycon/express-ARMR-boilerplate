import bcrypt from 'bcrypt';
import User from '../../models/user';
import UserPasswordMismatch from '../../errors/auth/user-password-mismatch';

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  const passwordMatched = await bcrypt.compare(password, user.password);
  if (!passwordMatched) {
    throw new UserPasswordMismatch();
  } else {
    await user.login();
    res.send({ success: true });
  }
};

export default login;
