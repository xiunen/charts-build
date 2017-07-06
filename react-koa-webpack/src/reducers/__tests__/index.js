import meta from '../meta';
import actionTypes from '../../constants/actionTypes';

describe('test meta reducer', () => {
  test('no input', () => {
    expect(meta(null, { type: actionTypes.SET_META })).toEqual({ description: 'description', keywords: 'keywords', title: 'Title' });
  });
});
