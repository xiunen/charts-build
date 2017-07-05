import actionTypes from '../constants/actionTypes';

const setMeta = (data) => {
  return {
      type: actionTypes.SET_META,
      payload: data
  }
}

export default setMeta;
