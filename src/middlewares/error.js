// eslint-disable-next-line
const errorMiddleware = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  res.status(err.statusCode || 500);
  res.json({ message: err.message || 'Something went wrong. Please try again.' });
};

export default errorMiddleware;
