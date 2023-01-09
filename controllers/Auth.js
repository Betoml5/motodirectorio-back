const passport = require("passport");
const responseHTTP = require("../network/response");
const jwt = require("jsonwebtoken");
const { config } = require("../config");

const controller = {
  login: async (req, res, next) => {
    passport.authenticate("login", async (err, user, info) => {
      try {
        if (err | !user)
          return responseHTTP.error(
            req,
            res,
            {
              message: "Password or number control wrong",
            },
            403
          );

        req.login(user, { session: false }, async (err) => {
          if (err) next(err);

          const payload = { user };
          const token = jwt.sign(
            { id: user._id, roles: [req.user.role] },
            config.authJwtSecret
          );

          return responseHTTP.success(req, res, { token, payload }, 200);
        });
      } catch (error) {
        return responseHTTP.error(req, res, error, 500);
      }
    })(req, res, next);
  },
};

module.exports = controller;
