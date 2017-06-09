import { GET_ISSUES_SUCCESS } from '../actions/issues';
import { GET_STATUS_SUCCESS } from '../actions/statuses';

const initialState = {
  issues: [],
  statusesForIssues: {}
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ISSUES_SUCCESS:
      return Object.assign({}, state, { issues: action.issues });
    case GET_STATUS_SUCCESS:
      let newEntry = {};
      newEntry[action.status.issueKey] = action.status;
      return Object.assign({}, state, { statusesForIssues: Object.assign({}, state.statusesForIssues, newEntry) });
  }

  return state;
}
