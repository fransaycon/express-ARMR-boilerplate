const receiveStuff = (req, res) => {
  res.json({ secret: `You have accessed a protected route user with email: ${req.user.email}` });
};

export default receiveStuff;
