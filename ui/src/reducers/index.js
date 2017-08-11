import { GET_ISSUE_PROVIDER_SUCCESS, FIND_ISSUE_PROVIDERS_SUCCESS } from '../actions/issueProviders';
import { GET_STATUS_SUCCESS, GET_STATUS_ERROR } from '../actions/statuses';
import { GET_INFO_SUCCESS } from '../actions/info';

const initialState = {
  issueProviders: {},
  statusesForIssues: {},
  info: {}
};

export default function (state = initialState, action) {
  let newEntry = {};
  let issueProviders;

  switch (action.type) {
    // Issue providers
    case FIND_ISSUE_PROVIDERS_SUCCESS:
      issueProviders = {};
      action.issueProviders.forEach(issueProvider => issueProviders[issueProvider.id] = Object.assign({}, state.issueProviders[issueProvider.id], issueProvider));
      return Object.assign({}, state, { issueProviders });
    case GET_ISSUE_PROVIDER_SUCCESS:
      newEntry[action.issueProvider.id] = action.issueProvider;
      return Object.assign({}, state, { issueProviders: Object.assign({}, state.issueProviders, newEntry) });

    // Status providers
    case GET_STATUS_SUCCESS:
      newEntry[action.issueKey] = action.status;
      return Object.assign({}, state, { statusesForIssues: Object.assign({}, state.statusesForIssues, newEntry) });
    case GET_STATUS_ERROR:
      newEntry[action.issueKey] = {};
      return Object.assign({}, state, { statusesForIssues: Object.assign({}, state.statusesForIssues, newEntry) });

    // Info
    case GET_INFO_SUCCESS:
      return Object.assign({}, state, { info: action.info });

    default:
      return state;
  }
}
