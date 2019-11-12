const moment = require('moment');

const commonUtils = require('../../utils/commons.utils');
const dbUtils = require('../../utils/db.utils');

const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PASSWORD_REGEX = /^(?=.*\d).{4,20}$/;

module.exports = {
	signUp: (req, res) => {
		dbUtils.dbConnection().then(async(db) => {
			const Users = require('../classes/users-class')(db);

			let login 		= req.body.login;
			let password 	= req.body.password;
			let email 		= req.body.email;
			let creationDate = commonUtils.newDate();

			// birthday = moment(birthday, 'DD-MM-YYYY').format('YYYY-MM-DD');

			if(login == null || email == null || password == null) {
				return res.status(400).json({ 'error': 'missing parameters' });
			}

			if(login >= 13 || login <= 3) {
				return res.status(400).json({ 'error': 'username length problem (between 4 and 12)' });
			}

			if(!EMAIL_REGEX.test(email)) {
				return res.status(400).json({ 'error': 'email invalid' });
			}

			if(!PASSWORD_REGEX.test(password)) {
				return res.status(400).json({ 'error': 'password invalid (between 4 and 20 and include 1 number)' });
			}
			
			const signupUser = await Users.signup(
				login, 
				password, 
				email,
				creationDate,
			);

			return res.json(commonUtils.checkAndChange(signupUser));
		}).catch((err) => {
			return res.status(500).json({ 'error': `Connection error ${err}` });
		});

	},

	signIn: (req, res) => {
		dbUtils.dbConnection().then(async(db) => {
			const Users = require('../classes/users-class')(db);

			let login 			= req.body.login;
			let email 			= req.body.email;
			let password 		= req.body.password;
			let connectedDate 	= commonUtils.newDate();

			if(login == null || email == null || password == null) {
				return res.status(400).json({ 'error': 'missing parameters' });
			}
			
			const signinUser = await Users.signin(
				login, 
				password, 
				email,
				connectedDate,
			);

			return res.json(commonUtils.checkAndChange(signinUser));

		}).catch((err) => {
			return res.status(500).json({ 'error': `Connection error ${err}` });
		});
	},

};
