import { statuses } from '../../services';

export const GET_STATUS_REQUEST = 'GET_STATUS_REQUEST';
export const GET_STATUS_SUCCESS = 'GET_STATUS_SUCCESS';
export const GET_STATUS_ERROR = 'GET_STATUS_ERROR';

export const getStatusSuccess = (issueKey, status) => ({ type: GET_STATUS_SUCCESS, issueKey, status });
export const getStatusError = (issueKey, error) => ({ type: GET_STATUS_ERROR, issueKey, error });

export function getStatus(issueKey) {
  return dispatch => {
    dispatch({ type: GET_STATUS_REQUEST });
    return statuses.get(issueKey).then(status => {
      dispatch(getStatusSuccess(issueKey, status));
    }).catch(error => {
      dispatch(getStatusError(issueKey, error));
    });
  };
}
