/**
 * is-stock-person
 *
 * A simple policy that blocks requests from non-stock-people.
 *
 */
module.exports = async function (req, res, proceed) {

  // First, check whether the request comes from a logged-in user.
  // > For more about where `req.me` comes from, check out this app's
  // > custom hook (`api/hooks/custom/index.js`).
  if (!req.me) {
    return res.unauthorized();
  }//•

  // Then check that this user is a "stock person".
  if (!req.me.isStockPerson) {
    return res.forbidden();
  }//•

  // IWMIH, we've got ourselves a "stock person".
  return proceed();

};
