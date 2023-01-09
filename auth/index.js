const passport = require("passport");
const Worker = require("../models/Worker");
const localStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;

const { config } = require("../config");

passport.use(
  "login",
  new localStrategy(
    { usernameField: "controlNumber", passwordField: "password" },
    async (controlNumber, password, done) => {
      try {
        const worker = await Worker.findOne({ controlNumber });

        if (!worker) return done(null, false, { message: "Worker not found" });

        const validate = await bcrypt.compare(password, worker.password);
        if (!validate) return done(null, false, { message: "Wrong password" });
        delete worker._doc.password;
        return done(null, worker, { message: "Login sucessfully" });
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.use(
  new JWTStrategy(
    {
      secretOrKey: config.authJwtSecret,
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    },
    (token, done) => {
      try {
        if (!token) {
          return done(null, "Token required");
        }
        return done(null, token);
      } catch (e) {
        done(e);
      }
    }
  )
);
