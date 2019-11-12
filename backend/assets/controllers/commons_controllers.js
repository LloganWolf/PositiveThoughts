const jwtUtils = require('../../utils/jwt.utils');

module.exports = {
  home: (res) => {
    
    return res.status(200).json({ 
        response: "Serveur OK. API ready !"
     });
  },

  checkTokenAlive: (req, res) => {
    const header_auth = req.params.token;
    const checking = jwtUtils.verifAliveToken(header_auth);
		
    return res.status(200).json({ 
      response: checking,
    });
  }
}