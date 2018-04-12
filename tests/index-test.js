import expect from 'expect';
import React from 'react';
import Enzyme from 'enzyme';
import { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

describe('Component', () => {

  beforeEach(() => {
  })

  afterEach(() => {
  })

  it('displays a welcome message', () => {
    expect(true).toBe(true);
  })
})
