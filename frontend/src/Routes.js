import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import history from "./History";

import App from './Containers/App';
import Message from './Containers/Message';
import CreateMessage from './Containers/CreateMessage';
import UpdateMessage from './Containers/UpdateMessage';

import NotFound from './Containers/NotFound';

import Connection from './Containers/Connection';
import Subscription from './Containers/Subscription';



class Routes extends Component {
    render() {
        return (
			<Router history={history}>
				<Switch>
					<Route exact path='/' component={Connection} />
					<Route exact path='/register' component={Subscription} />
					<Route exact path='/home/' component={App} />

					<Route exact path='/messages/create' component={CreateMessage} />
					<Route exact path='/messages/update/:id' component={UpdateMessage} />
					<Route exact path='/messages/:id' component={Message} />

					<Route component={NotFound} />
				</Switch>
			</Router>
        );
    }
}

export default Routes;
