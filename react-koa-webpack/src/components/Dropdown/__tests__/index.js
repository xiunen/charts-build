import React from 'react';
import { shallow } from 'enzyme';
import Dropdown from '../index';

describe('test component dropdown', () => {
  test('it should have class dropdown', () => {
    const component = shallow(<Dropdown />);
    console.log(component.html());
    expect(component.hasClass('dropdown')).toEqual(true);
  });
});
