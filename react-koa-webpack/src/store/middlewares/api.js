import fetch from 'isomorphic-fetch';
import queryString from 'query-string';

export default function api(ctx, getApi) {
  return store => next => action => {
    const {url, types, query, data, method, ...others} = action;
    if(typeof url === 'undefined'){
      return next(action);
    }

    if (typeof url !== 'string') {
      throw new Error('url should be string');
    }

    if (!Array.isArray(types) && types.length === 3){
      throw new Error('types should be array and length must be 3');
    }

    next({
      type: types[0],
      ...others
    });

    const api = (typeof getApi === 'undefined') ? url : getApi(url);
    const allowedMethods = ['GET', 'POST','PUT','DELETE'];
    const methodUpper = (method || 'GET').toUpperCase();
    if (allowedMethods.indexOf(methodUpper) < 0) {
      throw new Error('method not allowed');
    }
    const hasQuestionSign = api.indexOf('?')!==-1;

    const urlString  = query ? `${api}${hasQuestionSign?'&':'?'}${queryString.stringify(query)}` : api;
    return fetch(urlString, {
      method: methodUpper,
      body: data
    }).then(res=>{
      if(res.status === 200) {
        return res.json()
      }else{
        next({
          type: types[2],
          ...others,
          payload: {
            msg: res.statusText,
            statusCode: res.status
          }
        })
      }
    }).then(res=>{
      next({
        type: types[1],
        ...others,
        payload: res
      })
    }).catch(e=>{
      next({
          type: types[2],
          ...others,
          payload: {
            msg: e.message
          }
      })
    })
  }
}
