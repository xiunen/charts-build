import actionTypes from '@constants/actionTypes';

// console.log(ADD_ITEM,REQUEST_ITEM_BEGIN,REQUEST_ITEM_SUCCESS,REQUEST_ITEM_FAILURE);
const counter = ()=>{
  return {
      type: actionTypes.ADD_ITEM
  }
};
const fetchHomeData = () => {
  return {
    types: [
      actionTypes.REQUEST_ITEM_BEGIN,
      actionTypes.REQUEST_ITEM_SUCCESS,
      actionTypes.REQUEST_ITEM_FAILURE
    ],
    url: '/api',
    method: 'GET',
    query: {id:1}, // get参数
    //data: {}, //post 参数
    //meta: {}, // 额外参数
  }
};

export default {fetchHomeData,counter};
