/* global describe, it */

import React from 'react';
import { expect } from 'chai'; // bringing in the assertion library.
import { shallow } from 'enzyme'; // shallow render something - fake. When we run our tests it will create a fake dom with our components, and pass it in props.

import IndexRoute from '../../src/components/images/IndexRoute';
import NewRoute from '../../src/components/images/NewRoute';

describe('Front end tests', () => {
  it('should render one main', done => {

    const wrapper = shallow(<IndexRoute />);
    expect(wrapper.find('main').length).to.equal(1);

    done();
  });
  it('should render one button', done => {
    const wrapper = shallow(<NewRoute />);
    expect(wrapper.find('button').length).to.equal(1);

    done();
  });

});
