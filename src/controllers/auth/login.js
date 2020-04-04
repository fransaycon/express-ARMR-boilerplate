import bcrypt from 'bcrypt';
import User from '../../models/user';

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  user.lastLoggedIn = new Date();
  await user.save();

  const passwordMatched = await bcrypt.compare(password, user.password);

  if (!passwordMatched) {
    res.send({ success: false });
  } else {
    res.send({ success: true });
  }
};

export default login;
