const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  // split is needed to remove the 'bearer' string from the authorization
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'secret_this_should_be_longer');
    req.userData = { email: decodedToken.token, userId: decodedToken.userId };
    next();
  } catch (error) {
    res.status(401).json({ message: 'You are not authenticated' });
  }
}
