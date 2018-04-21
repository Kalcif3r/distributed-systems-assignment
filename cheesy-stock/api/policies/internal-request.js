/**
 * serverToServerAuth
 *
 * check for authentication header
 * make sure the key is correct
 *
 */
module.exports = function (req, res, next) {
  if (req.headers.authorization && req.headers.authorization === sails.config.keys.accessToken.self) {
    return next()
  }

  return res.forbidden()
}
