import jwt from 'jsonwebtoken';
import UserForbidden from '../errors/auth/user-forbidden';
import User from '../models/user';

const isAuthorized = async (req, res, next) => {
  const authorization = req.cookies?.Authorization;
  const token = authorization.replace('Bearer ', '');
  const { id } = jwt.verify(token, process.env.PUBLIC_KEY);

  if (id) {
    const user = await User.findById(id);
    req.user = user;
  } else {
    throw new UserForbidden();
  }
  next();
};

export default isAuthorized;
