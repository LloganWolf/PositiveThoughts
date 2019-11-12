import React from 'react';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import NotFound from '../Containers/NotFound';

describe('<NotFound />', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(
		<NotFound />
	)
  })

})