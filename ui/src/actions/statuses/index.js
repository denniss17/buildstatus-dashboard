import { statuses } from '../../services';

export const GET_STATUS_REQUEST = 'GET_STATUS_REQUEST';
export const GET_STATUS_SUCCESS = 'GET_STATUS_SUCCESS';
export const GET_STATUS_ERROR = 'GET_STATUS_ERROR';

export const getStatusSuccess = status => ({ type: GET_STATUS_SUCCESS, status });
export const getStatusError = error => ({ type: GET_STATUS_ERROR, error });

export function getStatus(issueKey) {
  return dispatch => {
    dispatch({ type: GET_STATUS_REQUEST });
    return statuses.get(issueKey).then(status => {
      dispatch(getStatusSuccess(status));
    }).catch(error => {
      dispatch(getStatusError(error));
    });
  };
}
