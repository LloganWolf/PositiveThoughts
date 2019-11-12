// MODULES
require('babel-register');
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const expressOasGenerator = require('express-oas-generator');
const swaggerUi = require('swagger-ui-express');
// const swaggerDocument = require('./assets/swagger.json');

// CONTROLLERS
const commonsController = require('./assets/controllers/commons_controllers');
const usersController = require('./assets/controllers/users_controllers');
const messagesController = require('./assets/controllers/messages_controllers');

// UTILS
const config = require('./assets/config');
const dbUtils = require('./utils/db.utils');

dbUtils.dbConnection().then((db) => {
  console.log('Connected');
  
  const app = express();
  app.use(morgan('dev'));
  app.use(cors())
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));


  /* **** ROUTING **** */
  const commonsRouter = express.Router();
  const usersRouter = express.Router();
  const messagesRouter = express.Router();


  /* **** ROUTES **** */
  // Commons routes
  commonsRouter.route('/')
    .get(commonsController.home);

  commonsRouter.route('/checkAuth/:token')
    .get(commonsController.checkTokenAlive);


  // Users routes
  usersRouter.route('/signup')
    .post(usersController.signUp);

  usersRouter.route('/signin')
    .post(usersController.signIn);


  // Messages routes
  messagesRouter.route('/all')
    .get(messagesController.readMessages)

  messagesRouter.route('/')
    .get(messagesController.readUserMessages)
    .post(messagesController.addMessage);

  messagesRouter.route('/:id')
    .get(messagesController.readMessage)
    .put(messagesController.updateMessage)
    .delete(messagesController.deleteMessage)

  /* ROUTES MIDDLEWARES */
  app.use(`${config.root_url}commons/`, commonsRouter);   // http://localhost:6002/api/v1/commons/
  app.use(`${config.root_url}users/`, usersRouter);       // http://localhost:6002/api/v1/users/
  app.use(`${config.root_url}messages/`, messagesRouter); // http://localhost:6002/api/v1/messages/


  /* APPLICATION RUN */
  app.listen(config.api_port, () => {
    console.log(`Application run on port ${config.api_port}`);
  })


}).catch((err) => {
  console.log(`Cannot connect to database : ${err.message}`);
});
