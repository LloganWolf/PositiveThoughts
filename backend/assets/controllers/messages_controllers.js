const moment = require('moment');

const commonUtils = require('../../utils/commons.utils');
const dbUtils = require('../../utils/db.utils');

module.exports = {
	readMessages: (req, res) => {
		dbUtils.dbConnection().then(async(db) => {
			const Messages = require('../classes/messages-class')(db);
			const max = req.query.max

			const readMessages = await Messages.readAll(
				max,
			);

			return res.json(commonUtils.checkAndChange(readMessages));
			
		}).catch((err) => {
			return res.status(500).json({ 'error': `Connection error ${err}` });
		});

	},

	readUserMessages: (req, res) => {
		dbUtils.dbConnection().then(async(db) => {
			const Messages = require('../classes/messages-class')(db);
			
			const max = req.query.max
			const headerAuth 	= req.headers['authorization'];

			const readUserMessages = await Messages.readAllByUser(
				max,
				headerAuth,
			);

			return res.json(commonUtils.checkAndChange(readUserMessages));
			
		}).catch((err) => {
			return res.status(500).json({ 'error': `Connection error ${err}` });
		});

	},

	readMessage: (req, res) => {
		dbUtils.dbConnection().then(async(db) => {
			const Messages = require('../classes/messages-class')(db);
			const id = req.params.id

			const readMessage = await Messages.readOne(
				id,
			);

			return res.json(commonUtils.checkAndChange(readMessage));
			
		}).catch((err) => {
			return res.status(500).json({ 'error': `Connection error ${err}` });
		});

	},

	addMessage: (req, res) => {
		dbUtils.dbConnection().then(async(db) => {
			const Messages = require('../classes/messages-class')(db);

			const title 		= req.body.title;
			const content 		= req.body.content;
			const category		= req.body.category;
			const creationDate 	= commonUtils.newDate();
			const headerAuth 	= req.headers['authorization'];
			
			if(title == null || content == null) {
				return res.status(400).json({ 'error': 'missing parameters' });
			}
			
			const addMessage = await Messages.add(
				title, 
				content, 
				category, 
				creationDate,
				headerAuth,
			);

			return res.json(commonUtils.checkAndChange(addMessage));
			
		}).catch((err) => {
			return res.status(500).json({ 'error': `Connection error ${err}` });
		});

	},
	
	updateMessage: (req, res) => {
		dbUtils.dbConnection().then(async(db) => {
			const Messages = require('../classes/messages-class')(db);

			const id 			= req.params.id;
			const title 		= req.body.title;
			const content 		= req.body.content;
			const category		= req.body.category;
			const modifiedDate 	= commonUtils.newDate();
			const headerAuth 	= req.headers['authorization'];
			
			const updateMessage = await Messages.update(
				id,
				title, 
				content, 
				category,
				modifiedDate,
				headerAuth,
			);

			return res.json(commonUtils.checkAndChange(updateMessage));

		}).catch((err) => {
			return res.status(500).json({ 'error': `Connection error ${err}` });
		});
	},

	deleteMessage: (req, res) => {
		dbUtils.dbConnection().then(async(db) => {
			const Messages = require('../classes/messages-class')(db);
			const id = req.params.id
			const headerAuth = req.headers['authorization'];
			
			const deleteMessage = await Messages.delete(
				id, 
				headerAuth,
			);

			return res.json(commonUtils.checkAndChange(deleteMessage));

		}).catch((err) => {
			return res.status(500).json({ 'error': `Connection error ${err}` });
		});
	},

};
