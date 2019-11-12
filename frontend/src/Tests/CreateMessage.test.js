import React from 'react';
import { Router } from 'react-router-dom';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { store } from '../Store/combinedReducers';
import history from "../History";
import CreateMessage from '../Containers/CreateMessage';

describe('<CreateMessage />', () => {
  it('renders container without crashing', () => {
    const wrapper = shallow(
		<Provider store={store}>
			<Router history={history}>
				<CreateMessage />
			</Router>
		</Provider>
	)
  })

})