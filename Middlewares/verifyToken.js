const jwt = require("jsonwebtoken");
module.exports = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) res.status(403).json({ message: "Token missing!!" });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET, "1d");
    req.userId = decoded.userId;
    req.role = decoded.role;
    next();
  } catch (err) {
    res.status(403).json({ message: "Invalid Token!!" });
  }
};
