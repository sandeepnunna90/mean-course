const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  // split is needed to remove the 'bearer' string from the authorization
  try {
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, 'secret_this_should_be_longer');
    next();
  } catch (error) {
    res.status(401).json({ message: 'Auth failed!' });
  }
}
