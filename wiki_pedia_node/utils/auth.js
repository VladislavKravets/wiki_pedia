const jwt = require('jsonwebtoken');

const generateToken = (user) => {
  const { id, username, admin } = user;
  const payload = { id, username, admin };
  return jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '7d' });
};

module.exports = generateToken;
