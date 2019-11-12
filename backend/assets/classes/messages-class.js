const config = require('../config');
const jwtUtils = require('../../utils/jwt.utils');

let db;

module.exports = (_db) => {
		db = _db
		return Messages
}

let Messages = class {

  static readAll(max) {
    return new Promise((next) => {
			if(max != undefined && max > 0) {
        db.query('SELECT * FROM messages LIMIT 0, ?', [parseInt(max)])
          .then((result) => {
            next(result)
          })
          .catch((err) => {
            next(err)
          })

      } else if(max != undefined) {
        next( new Error(config.errors.badMaxValue) );

      } else {
        db.query('SELECT * FROM messages')
          .then((result) => {
            next(result)
          })
          .catch((err) => {
            next(err)
          })
      }

    })
  }

  static readAllByUser(max, headerAuth) {
    return new Promise((next) => {
      let userId = jwtUtils.getUserId(headerAuth);

			if(userId < 0 ) {
				next( new Error(config.errors.badToken) );
      }
      
      if(max != undefined && max > 0) {
        db.query('SELECT * FROM messages WHERE user_id = ? LIMIT 0, ?', [userId, parseInt(max)])
          .then((result) => {
            next(result)
          })
          .catch((err) => {
            next(err)
          })

      } else if(max != undefined) {
        next( new Error(config.errors.badMaxValue) );

      } else {
        db.query('SELECT * FROM messages WHERE user_id = ?', [userId])
          .then((result) => {
            next(result)
          })
          .catch((err) => {
            next(err)
          })
      }

    })
  }

	static readOne(id) {
    return new Promise((next) => {
      db.query('SELECT * FROM messages WHERE id=?', [id])
        .then((result) => {
          if(result[0] != undefined) {
  					next(result[0]);

  				} else {
  					next( new Error(config.errors.badID) );
  				}
        })
        .catch((err) => next(err))

    })
  }

  static add(title, content, category, creationDate, headerAuth) {
    return new Promise((next) => {
			let userId = jwtUtils.getUserId(headerAuth);

			if(userId < 0 ) {
				next( new Error(config.errors.badToken) );
			}

			db.query('SELECT * FROM messages WHERE title=?', [title])
        .then((result) => {

					if(result[0] != undefined) {
            next( new Error(config.errors.messageAlreadyExist) );

					} else {
						return db.query('INSERT INTO messages(title, content, category, created_at, user_id) VALUES(?, ?, ?, ?, ?)', [title, content, category, creationDate, userId])
          }

        }).then(() => {
          return db.query('SELECT * FROM messages WHERE title=?', [title])

        }).then((result) => {
					next({
						id: result[0].id,
            title: result[0].title,
						content: result[0].content,
            category: result[0].category,
						created_at: result[0].created_at,
						user_id: result[0].user_id,
          })

        }).catch((err) => next(err))
    });
  }

  static update(id, title, content, category, modifiedDate, headerAuth) {
    return new Promise((next) => {
			let userId = jwtUtils.getUserId(headerAuth);

			if(userId < 0 ) {
				next( new Error(config.errors.badToken) );
			}

			db.query('SELECT * FROM messages WHERE id=?', [id])
        .then((result) => {
          if (result[0] == undefined) {
            next(new Error(config.errors.messageDoesntExist));

          } else {
            return db.query('UPDATE messages SET title = ?, content = ?, category = ?, modified_at = ? WHERE id = ?', [title, content, category, modifiedDate, id])
          }

        })
        .then(() => next(true))
        .catch((err) => next(err))
    });
  }

  static delete(id, headerAuth) {
    return new Promise((next) => {
			let userId = jwtUtils.getUserId(headerAuth);

			if(userId < 0 ) {
				next( new Error(config.errors.badToken) );
			}

			db.query('SELECT * FROM messages WHERE id=? AND user_id=?', [id, userId])
        .then((result) => {
					if(result[0] != undefined) {
            return db.query('DELETE FROM messages WHERE id = ?', [id])

          } else {
             next(new Error(config.errors.badID));

          }

        })
        .then(() => next(true))
        .catch((err) => next(err))
    });
  }

}
