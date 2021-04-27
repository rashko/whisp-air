import { call, put, takeLatest, all } from "redux-saga/effects";
import { getIncidents, getIncidentsTotal, getIncident} from "../api";
import {
  INCIDENTS_FETCH_REQUESTED,
  INCIDENTS_FETCH_SUCCEEDED,
  INCIDENTS_FETCH_FAILED,
  INCIDENT_FETCH_REQUESTED,
  INCIDENT_FETCH_SUCCEEDED,
  INCIDENT_FETCH_FAILED,
} from "../store/types";

const mapGeometry = (data) => {
  const hash = {};
  data.forEach((item) => {
    hash[item.properties.id] = {
      coordinates: item.geometry.coordinates,
    };
  });
  return hash;
};

function* fetchIncidents(action) {
  try {
    const [incidents, geometry] = yield all([
      call(getIncidents, {
        page: action.page,
        per_page: action.per_page,
        occurred_after: action.occurred_after,
        occurred_before: action.occurred_before,
        query: action.query
      }),
      call(getIncidentsTotal, {
        occurred_after: action.occurred_after,
        occurred_before: action.occurred_before,
        query: action.query
      }),
    ]);
    yield put({
      type: INCIDENTS_FETCH_SUCCEEDED,
      incidents,
      geometry: mapGeometry(geometry),
      total: geometry.length,
    });
  } catch (e) {
    yield put({ type: INCIDENTS_FETCH_FAILED, message: e.message });
  }
}

function* fetchIncident(action) {
  try {
    const [incident, geometry] = yield all([
      call(getIncident, {
        id: action.id,
      }),
      call(getIncidentsTotal, {
        occurred_after: action.occurredAfter,
      }),
    ]);
    yield put({
      type: INCIDENT_FETCH_SUCCEEDED,
      incident,
      geometry: mapGeometry(geometry),
    });
  } catch (e) {
    yield put({ type: INCIDENT_FETCH_FAILED, message: e.message });
  }
}

function* mySaga() {
  yield takeLatest(INCIDENTS_FETCH_REQUESTED, fetchIncidents);
  yield takeLatest(INCIDENT_FETCH_REQUESTED, fetchIncident);
}

export default mySaga;
