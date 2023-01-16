const passport = require("passport");
const responseHTTP = require("../network/response");
const jwt = require("jsonwebtoken");
const { config } = require("../config");
const { validationResult } = require("express-validator");
const controller = {
  login: async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return responseHTTP.error(req, res, { errors: errors.array() }, 422);
    }

    passport.authenticate("login", async (err, worker, info) => {
      try {
        if (err | !worker)
          return responseHTTP.error(
            req,
            res,
            {
              message: "Password or phone number wrong",
            },
            403
          );

        req.login(worker, { session: false }, async (err) => {
          if (err) next(err);

          const payload = { worker };
          const token = jwt.sign(
            { id: worker._id, roles: [worker.roles] },
            config.authJwtSecret,
            {
              expiresIn: "60d",
            }
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
