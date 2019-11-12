const bcrypt = require ('bcrypt');

const config = require('../config');
const jwtUtils = require('../../utils/jwt.utils');

let db;

module.exports = (_db) => {
		db = _db
		return Users
}

let Users = class {

  static signup(login, password, email, creationDate) {
    return new Promise((next) => {
			db.query('SELECT * FROM users WHERE email=?', [email])
        .then((result) => {
					if(result[0] != undefined) {
            next( new Error(config.errors.emailAlreadyTaken) );

					} else {
						bcrypt.hash(password, 5, (err, hashedPassword) => {
              if(err) {
                next( new Error(config.errors.wrongQuery) );

              } else {
                return db.query(
                  'INSERT INTO users(login, password, email, created_at) VALUES(?, ?, ?, ?)',
                  [login, hashedPassword, email, creationDate]
                )
              }
						});

					}
        }).then(() => {
          return db.query('SELECT * FROM users WHERE email=?', [email])

        }).then(() => {
          next({
						message: "L'utilisateur a bien été enregistré"
          })

        }).catch((err) => next(err))

    })
  }

  static signin(login, password, email, connnectedDate) {
    return new Promise((next) => {
		db.query('SELECT * FROM users WHERE login=? AND email=?', [login, email])
      .then((result) => {
        if(result[0] == undefined) {
          next( new Error(config.errors.credentialError) );

        } else {
          bcrypt.compare(password, result[0].password, (errBycrypt, resBycrypt) => {
            if(resBycrypt) {
              next({
                id_user: result[0].id,
                login_user: result[0].login,
                email_user: result[0].email,
                creationDate_user: result[0].creationDate,
                token: jwtUtils.generateTokenForUser(result[0])
              })

            } else {
              next( new Error(config.errors.credentialError) );

            }
          });
        }

      }).then(() => {
        return db.query('UPDATE users SET connected_at=? WHERE login=? AND email=?', [connnectedDate, login, email])

      }).catch((err) => next(err))

    })
  }

}
