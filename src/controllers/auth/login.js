import bcrypt from 'bcrypt';
import User from '../../models/user';

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  const passwordMatched = await bcrypt.compare(password, user.password);
  if (!passwordMatched) {
    res.send({ success: false });
  } else {
    await user.login();
    res.send({ success: true });
  }
};

export default login;
