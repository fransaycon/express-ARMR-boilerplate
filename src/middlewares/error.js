// eslint-disable-next-line
const errorMiddleware = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  res.status(err.statusCode);
  res.json({ message: err.message });
};

export default errorMiddleware;
