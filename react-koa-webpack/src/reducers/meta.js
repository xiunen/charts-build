import actionTypes from '../constants/actionTypes';

export default function(state={},action){
  switch (action.type) {
    case actionTypes.SET_META:
      return {
        title: 'Title',
        keywords: 'keywords',
        description: 'description',
        ...action.payload
      }
    default:
      return state;
  }
}
