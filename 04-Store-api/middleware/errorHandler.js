const { CustomAPIError } = require("../errors/custom-error");
const errorHandlerMiddleware = (err, req, res, next) => {
  if (err instanceof CustomAPIError) {
    return res.status(err.status).json({ msg: err.msg });
  }
  return res.status(500).json({ msg: "Something went wrong, please try again" });
};
module.exports = errorHandlerMiddleware;
