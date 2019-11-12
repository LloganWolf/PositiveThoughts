const jwt = require('jsonwebtoken');

const JWT_SIGN_SECRET = 'hdeR9fx8UuO-Tm7tYthvCvqmrB3lXSj7HeijoeedOmpKFmBWQTj2yM4nui-bZ';
// Pour générer une clé secrete : https://mkjwk.org/

module.exports = {
  generateTokenForUser: ((userData) => {
    return jwt.sign({
      userId: userData.id,
    },
    JWT_SIGN_SECRET, {
      expiresIn: '1h',
    });
  }),

  parseAuthorization: ((authorization) => {
    return (authorization != null) ? authorization.replace('Bearer ', '') : null;
  }),

  getUserId: ((authorization) => {
    let userId = -1;
    const token = module.exports.parseAuthorization(authorization);

    if (token != null) {
      try {
        const jwtToken = jwt.verify(token, JWT_SIGN_SECRET);
        if (jwtToken != null) {
          userId = jwtToken.userId;
        }
      } catch (err) {
        console.log(err.message);
      }
    }

    return userId;
  }),

  verifAliveToken: ((authorization) => {
		let token = module.exports.parseAuthorization(authorization);
		let validation = null;
		
		if(token != null) {
			try {
        const jwtToken = jwt.verify(token, JWT_SIGN_SECRET);
        validation = jwtToken
			} catch(err) {
				console.log(err.message)
			}
		}
		
		return validation;
  }),
  
};
