import React from 'react';
import { Router } from 'react-router-dom';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { store } from '../Store/combinedReducers';
import history from "../History";
import Message from '../Containers/Message';

describe('<Message />', () => {
  it('renders container without crashing', () => {
    const wrapper = shallow(
		<Provider store={store}>
			<Router history={history}>
				<Message />
			</Router>
		</Provider>
	)
  })

})