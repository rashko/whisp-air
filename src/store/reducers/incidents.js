import { INCIDENTS_FETCH_SUCCEEDED } from "../types";
const initialState = {
  incidents: [],
  total: 0
};

export default function appReducer(state = initialState, action) {
  switch (action.type) {
    case INCIDENTS_FETCH_SUCCEEDED:
      return {
        ...state,
        incidents: action.incidents,
        total: action.total
      };
    default:
      return state;
  }
}
