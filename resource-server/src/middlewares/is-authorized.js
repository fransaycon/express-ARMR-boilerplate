import jwt from "jsonwebtoken";
import UserForbidden from "../errors/auth/user-forbidden";
import UserNotFound from "../errors/auth/user-not-found";
import User from "../models/user";

const isAuthorized = async (req, res, next) => {
  const authorization = req.cookies?.Authorization;
  const token = authorization ? authorization.replace("Bearer ", "") : "";

  try {
    const { id } = jwt.verify(token, process.env.TOKEN_PUBLIC_KEY, {
      algorithms: "RS256",
    });
    const user = await User.findById(id);
    req.user = user;
  } catch (error) {
    throw new UserForbidden();
  }

  if (!req.user) {
    throw new UserNotFound();
  }

  next();
};

export default isAuthorized;
