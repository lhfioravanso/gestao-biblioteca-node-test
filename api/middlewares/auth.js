const jwt = require('jsonwebtoken');
const config = require(__dirname + '/../config/config.json')['auth'];

function generateToken(userId){
    let token = jwt.sign({ id: userId }, config.secret, {
        expiresIn: config.duration
    });
    return token;
};

function validateToken(req, res, next) {
  var token = req.headers['x-access-token'];
  if (!token)
    return res.status(403).send({ auth: false, message: 'Token não foi informado.' });

  jwt.verify(token, config.secret, function(err, decoded) {
    if (err)
    return res.status(500).send({ auth: false, message: 'Falha ao autenticar o token.' });

    req.userId = decoded.id;
    next();
  });
}

module.exports = {
    generateToken,
    validateToken
};