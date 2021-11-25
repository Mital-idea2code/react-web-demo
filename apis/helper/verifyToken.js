const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const bearerHeader = req.headers["authorization"];

  if (bearerHeader) {
    const bearer = bearerHeader.split(" ");
    const token = bearer[1];
    if (!token) return res.status(401).json({ error: "AuthToken missing" });
    try {
      const verified = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      req.user = verified;
      next();
    } catch (error) {
      res.status(400).json({ error: "Invalid Token" });
    }
  } else {
    // Forbidden
    res.sendStatus(403).json({ error: "AuthToken missing" });
  }
};
