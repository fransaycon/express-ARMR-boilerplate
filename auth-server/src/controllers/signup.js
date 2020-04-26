import bcrypt from "bcrypt";
import User from "../models/user";
import UserEmailDuplicate from "../errors/user-email-duplicate";

const SALT_ROUNDS = 10;
const DUPLICATE_ERROR_CODE = 11000;

const signup = async (req, res) => {
  const { email, password } = req.body;

  const salt = bcrypt.genSaltSync(SALT_ROUNDS);
  const hashedPassword = await bcrypt.hash(password, salt);

  try {
    await User.create({
      email,
      password: hashedPassword,
    });
  } catch (error) {
    if (error.code === DUPLICATE_ERROR_CODE && error?.keyPattern?.email) {
      throw new UserEmailDuplicate();
    }
  }

  res.json({ success: true });
};

export default signup;
