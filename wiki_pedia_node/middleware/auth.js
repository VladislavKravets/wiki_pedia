const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];

  if (!token) {
    return res.status(401).json({error: 'Отсутствует токен авторизации'});
  }

  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(403).json({error: 'Недействительный токен авторизации'});
    }

    req.token = decoded;
    next();
  });
};

module.exports = authenticateToken;
