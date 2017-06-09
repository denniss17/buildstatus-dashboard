import { issues } from '../../services';
import { getStatus } from '../statuses';

export const GET_ISSUES_REQUEST = 'GET_ISSUES_REQUEST';
export const GET_ISSUES_SUCCESS = 'GET_ISSUES_SUCCESS';
export const GET_ISSUES_ERROR = 'GET_ISSUES_ERROR';

export const getIssuesSuccess = issues => ({ type: GET_ISSUES_SUCCESS, issues });
export const getIssuesError = error => ({ type: GET_ISSUES_ERROR, error });

export function getIssues() {
  return dispatch => {
    dispatch({ type: GET_ISSUES_REQUEST });
    return issues.find().then(issues => {
      dispatch(getIssuesSuccess(issues));
    }).catch(error => {
      dispatch(getIssuesError(error));
    });
  };
}

export function getIssuesWithStatus() {
  return (dispatch, getState) => {
    return dispatch(getIssues()).then(() => {
      getState().issues.forEach(issue => {
        return dispatch(getStatus(issue.key));
      });
    });
  };
}
