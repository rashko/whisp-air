import {
  INCIDENTS_FETCH_REQUESTED,
  INCIDENTS_FETCH_SUCCEEDED,
  INCIDENTS_FETCH_FAILED,
} from "../types";
const initialState = {
  incidents: [],
};

export default function appReducer(state = initialState, action) {
  switch (action.type) {
    case INCIDENTS_FETCH_SUCCEEDED:
        return {
            ...state,
            incidents: action.incidents
          }
    default:
      return state;
  }
}
