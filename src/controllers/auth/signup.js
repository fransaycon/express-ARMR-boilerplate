import bcrypt from 'bcrypt';
import User from '../../models/user';

const SALT_ROUNDS = 10;

const signup = async (req, res) => {
  const { email, password } = req.body;

  const salt = bcrypt.genSaltSync(SALT_ROUNDS);
  const hashedPassword = await bcrypt.hash(password, salt);

  await User.create({
    email,
    password: hashedPassword,
  });

  res.json({ success: true });
};

export default signup;
