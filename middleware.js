const jwt = require("jsonwebtoken");
exports.authenticated = (req, res, next) => {
  try {
    let tokenHeader = req.headers["authorization"];
    let token = tokenHeader.slice(7, tokenHeader.length);

    if (token) {
      jwt.verify(token, "nurdin", (err, decode) => {
        if (err) {
          return res.status(403).json({
            success: false,
            message: "token is not valid"
          });
        } else {
          req.user_id = decode.id;
          next();
        }
      });
    } else {
      return res.status(403).json({
        success: false,
        message: "You are not login"
      });
    }
  } catch (error) {
    res.send({
      message: "token is not defined",
      success: false
    });
  }
};
