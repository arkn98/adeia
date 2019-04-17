const checkRole = (...allowed) => {
  const isAllowed = role => allowed.indexOf(role) > -1;

  return (req, res, next) => {
    if (req.user && isAllowed(req.user.accountType)) {
      next();
    } else {
      res.status(403).json({ msg: 'You do not have sufficient permissions' });
    }
  };
};

module.exports = checkRole;
