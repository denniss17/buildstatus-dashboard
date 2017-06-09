import { info } from '../../services';

export const GET_INFO_REQUEST = 'GET_INFO_REQUEST';
export const GET_INFO_SUCCESS = 'GET_INFO_SUCCESS';
export const GET_INFO_ERROR = 'GET_INFO_ERROR';

export const getInfoSuccess = info => ({ type: GET_INFO_SUCCESS, info });
export const getInfoError = error => ({ type: GET_INFO_ERROR, error });

export function getInfo() {
  return dispatch => {
    dispatch({ type: GET_INFO_REQUEST });
    return info.find().then(info => {
      dispatch(getInfoSuccess(info));
    }).catch(error => {
      dispatch(getInfoError(error));
    });
  };
}
