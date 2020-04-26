import jwt from "jsonwebtoken";
import config from "../config";
import RefreshForbidden from "../errors/refresh-forbidden";
import RefreshUserMismatch from "../errors/refresh-user-mismatch";
import UserNotFound from "../errors/user-not-found";
import User from "../models/user";

const refresh = async (req, res) => {
  let authorizationData;
  let refreshData;
  try {
    authorizationData = jwt.decode(
      req.cookies?.Authorization,
      process.env.TOKEN_PUBLIC_KEY,
      {
        algorithms: "RS256",
      }
    );
    refreshData = await jwt.verify(
      req.cookies?.Refresh,
      process.env.REFRESH_PUBLIC_KEY,
      {
        algorithms: "RS256",
      }
    );
  } catch (error) {
    throw new RefreshForbidden();
  }

  if (authorizationData.id !== refreshData.id) {
    throw new RefreshUserMismatch();
  }

  const user = await User.findById(refreshData.id);
  if (!user) {
    throw new UserNotFound();
  }

  const token = jwt.sign({ id: user.id }, process.env.TOKEN_PRIVATE_KEY, {
    algorithm: "RS256",
    expiresIn: `${config.TOKEN_EXPIRATION_IN_MINUTES}m`,
  });
  res.cookie("Authorization", token, config.COOKIE_OPTIONS);

  res.json({ success: true });
};

export default refresh;
