const config = require('../config');

module.exports = () => {
		// Pour que ce soit la Class Users dans le fichier app.js, on retourne Users
		return Commons
}

let Commons = class {

  static getConfig() {
    return config;
  }

}
