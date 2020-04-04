// eslint-disable-next-line
const errorMiddleware = (err, req, res, next) => {
  // eslint-disable-next-line
  console.error(err);
  if (res.headersSent) {
    return next(err);
  }
  res.status(err.statusCode).json({ message: err.message });
};

export default errorMiddleware;
