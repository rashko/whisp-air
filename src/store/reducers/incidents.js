import {
  INCIDENTS_FETCH_REQUESTED,
  INCIDENTS_FETCH_SUCCEEDED,
  INCIDENT_FETCH_SUCCEEDED,
  INCIDENTS_FETCH_FAILED,
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
  errorFetching: false,
};

export default function appReducer(state = initialState, action) {
  switch (action.type) {
    case INCIDENTS_FETCH_REQUESTED:
      return {
        ...state,
        incidents: [],
        total: 0,
        isFetching: true,
        errorFetching: false,
      };
    case INCIDENTS_FETCH_SUCCEEDED:
      return {
        ...state,
        incidents: action.incidents,
        geometry: action.geometry,
        total: action.total,
        isFetching: false,
      };
    case INCIDENTS_FETCH_FAILED:
      return {
        ...state,
        errorFetching: true,
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
