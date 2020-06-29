const { config } = require("../config");
const Boom = require("boom");

function returnErrors(err, req, res, next) {
  if (err.isBoom) {
    const {
      output: { statusCode, payload },
    } = err;
    res.status(statusCode).json(payload);
  } else {
    const {
      output: { statusCode, payload },
    } = Boom.badImplementation();
    res.status(statusCode).json(payload);
  }
}

module.exports = returnErrors;
