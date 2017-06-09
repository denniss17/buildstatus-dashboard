import { GET_ISSUES_SUCCESS } from '../actions/issues';
import { GET_STATUS_SUCCESS,GET_STATUS_ERROR } from '../actions/statuses';
import { GET_INFO_SUCCESS } from '../actions/info';

const initialState = {
  issues: [],
  statusesForIssues: {},
  info: {}
};

export default function (state = initialState, action) {
  let newEntry = {};
  switch (action.type) {
    case GET_ISSUES_SUCCESS:
      return Object.assign({}, state, { issues: action.issues });

    case GET_STATUS_SUCCESS:
      newEntry[action.issueKey] = action.status;
      return Object.assign({}, state, { statusesForIssues: Object.assign({}, state.statusesForIssues, newEntry) });
    case GET_STATUS_ERROR:
      newEntry[action.issueKey] = {};
      return Object.assign({}, state, { statusesForIssues: Object.assign({}, state.statusesForIssues, newEntry) });

    case GET_INFO_SUCCESS:
      return Object.assign({}, state, { info: action.info });

    default:
      return state;
  }
}
