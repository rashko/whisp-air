import { INCIDENTS_FETCH_SUCCEEDED, SET_SELECTED_INCIDENT } from "../types";
const initialState = {
  incidents: [],
  total: 0,
  geometry: {},
  selectedIncident: {},
};

export default function appReducer(state = initialState, action) {
  switch (action.type) {
    case INCIDENTS_FETCH_SUCCEEDED:
      return {
        ...state,
        incidents: action.incidents,
        geometry: action.geometry,
        total: action.total,
      };
    case SET_SELECTED_INCIDENT:
      return {
        ...state,
        selectedIncident: state.incidents.find(i => i.id === action.id),
      };
    default:
      return state;
  }
}
