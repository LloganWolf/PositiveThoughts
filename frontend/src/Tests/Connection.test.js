import React from 'react';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import Connection from '../Containers/Connection';

describe('<Connection />', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(
		<Connection />
	)
  })

})