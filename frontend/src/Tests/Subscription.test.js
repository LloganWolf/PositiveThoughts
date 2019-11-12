import React from 'react';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import Subscription from '../Containers/Subscription';

describe('<Subscription />', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(
		<Subscription />
	)
  })

})