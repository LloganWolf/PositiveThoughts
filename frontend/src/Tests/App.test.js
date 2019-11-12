import React, { Fragment } from 'react';
import { Router } from 'react-router-dom';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { store } from '../Store/combinedReducers';
import history from "../History";
import App from '../Containers/App';
import Navbar from '../Components/Commons/Navbar';

describe('<App />', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(
		<Provider store={store}>
			<Router history={history}>
				<App />
			</Router>
		</Provider>
	)
  })

})