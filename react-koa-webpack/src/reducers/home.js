import actionTypes from '../constants/actionTypes';
import LoadingState from '../constants/LoadingState';

export default function (state = {}, action) {
  switch (action.type) {
    case actionTypes.ADD_ITEM:
      return Object.assign({}, state, {counter:1});
    case actionTypes.REQUEST_ITEM_BEGIN:
      return Object.assign({}, state, {loadingState: LoadingState.LOADING});
    case actionTypes.REQUEST_ITEM_SUCCESS:
      return Object.assign({}, state, {loadingState: LoadingState.SUCCESS,   data: action.payload});
    case actionTypes.REQUEST_ITEM_FAILURE:
      return Object.assign({}, state, {
        data: action.payload,
        loadingState: LoadingState.FAILURE
      });
      return result;
    default:
      return state;
  }
}
