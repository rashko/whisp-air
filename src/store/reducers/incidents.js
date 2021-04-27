import {
  INCIDENTS_FETCH_REQUESTED,
  INCIDENTS_FETCH_SUCCEEDED,
  INCIDENT_FETCH_SUCCEEDED,
  SET_SEARCH_PARAMS,
} from "../types";
const initialState = {
  incidents: [],
  total: 0,
  geometry: {},
  selectedIncident: null,
  query: "",
  date: "",
  isFetching: false,
};

export default function appReducer(state = initialState, action) {
  switch (action.type) {
    case INCIDENTS_FETCH_REQUESTED:
      return {
        ...state,
        isFetching: true,
      };
    case INCIDENTS_FETCH_SUCCEEDED:
      return {
        ...state,
        incidents: action.incidents,
        geometry: action.geometry,
        total: action.total,
        isFetching: false,
      };
    case INCIDENT_FETCH_SUCCEEDED:
      return {
        ...state,
        selectedIncident: action.incident,
        geometry: action.geometry,
      };
    case SET_SEARCH_PARAMS:
      return {
        ...state,
        query: action.query,
        date: action.date,
      };
    default:
      return state;
  }
}
