const jwt = require("jsonwebtoken");
require("dotenv").config();

const extractUserId = (req) => {
  try {
    // console.log(req.headers)
    const cookieHeader = req.headers.cookie;

    if (!cookieHeader) {
      console.log("No cookies found");
      return null;
    }

    const cookies = cookieHeader.split(";").reduce((acc, cookie) => {
      const [key, ...value] = cookie.trim().split("=");

      acc[key] = value.join("=");

      return acc;
    }, {});

    const token = cookies.duziolon;

    if (!token) {
      console.log("duziolon cookie not found");
      return null;
    }

    console.log("Token found");

    const decoded = jwt.verify(
      token,
      process.env.JWTSECRETKEY
    );

    console.log("Decoded JWT:", decoded);

    return decoded.user?.id || null;

  } catch (error) {
    console.log("JWT verification failed:", error.message);
    return null;
  }
};

module.exports = extractUserId;