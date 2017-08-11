import { issueProviders } from '../../services';
import { getStatus } from '../statuses';

export const FIND_ISSUE_PROVIDERS_REQUEST = 'FIND_ISSUE_PROVIDERS_REQUEST';
export const FIND_ISSUE_PROVIDERS_SUCCESS = 'FIND_ISSUE_PROVIDERS_SUCCESS';
export const FIND_ISSUE_PROVIDERS_ERROR = 'FIND_ISSUE_PROVIDERS_ERROR';
export const GET_ISSUE_PROVIDER_REQUEST = 'GET_ISSUE_PROVIDER_REQUEST';
export const GET_ISSUE_PROVIDER_SUCCESS = 'GET_ISSUE_PROVIDER_SUCCESS';
export const GET_ISSUE_PROVIDER_ERROR = 'GET_ISSUE_PROVIDER_ERROR';

export const findIssueProvidersSuccess = issueProviders => ({ type: FIND_ISSUE_PROVIDERS_SUCCESS, issueProviders });
export const findIssueProvidersError = error => ({ type: FIND_ISSUE_PROVIDERS_ERROR, error });
export const getIssueProviderSuccess = (id, issueProvider) => ({ type: GET_ISSUE_PROVIDER_SUCCESS, id, issueProvider });
export const getIssueProviderError = (id, error) => ({ type: GET_ISSUE_PROVIDER_ERROR, id, error });

export function findIssueProviders() {
  return dispatch => {
    dispatch({ type: FIND_ISSUE_PROVIDERS_REQUEST });
    return issueProviders.find().then(issueProviders => {
      dispatch(findIssueProvidersSuccess(issueProviders));
    }).catch(error => {
      dispatch(findIssueProvidersError(error));
    });
  };
}

export function getIssueProvider(id) {
  return dispatch => {
    dispatch({ type: GET_ISSUE_PROVIDER_REQUEST });
    return issueProviders.get(id).then(issueProvider => {
      dispatch(getIssueProviderSuccess(id, issueProvider));
    }).catch(error => {
      dispatch(getIssueProviderError(id, error));
    });
  };
}

export function findIssueProvidersWithStatus() {
  return (dispatch, getState) => {
    // First fetch a list of providers
    return dispatch(findIssueProviders()).then(() => {
      // Then fetch the provider including issues for each provider
      Object.keys(getState().issueProviders).forEach(id => {
        // And finally for each issue fetch the status
        return dispatch(getIssueProvider(id)).then(() => {
          getState().issueProviders[id].issues.forEach(issue => dispatch(getStatus(issue.key)));
        });
      });
    });
  };
}
