const responseHTTP = require("../network/response");
const passport = require("passport");
const middlewares = {
  verifyAuth: (req, res, next) => {
    passport.authenticate("jwt", { session: false }, (err, worker, info) => {
      //si hubo un error relacionado con la validez del token (error en su firma, caducado, etc)
      if (info) {
        return responseHTTP.error(req, res, info.message, 401);
      }
      //si hubo un error en la consulta a la base de datos
      if (err) {
        return responseHTTP.error(req, res, err, 401);
      }
      //si el token está firmado correctamente pero no pertenece a un usuario existente
      if (!worker) {
        return responseHTTP.error(
          req,
          res,
          { message: "No worker found" },
          401
        );
      }
      //inyectamos los datos de usuario en la request
      req.worker = worker;
      next();
    })(req, res, next);
  },
};

module.exports = middlewares;
