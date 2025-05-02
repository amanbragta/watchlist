export const getUserInfo = (req, res) => {
  res.send(req.user);
};
