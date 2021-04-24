import { call, put, takeLatest } from "redux-saga/effects";
import { getIncidents } from "../api";
import {
  INCIDENTS_FETCH_REQUESTED,
  INCIDENTS_FETCH_SUCCEEDED,
  INCIDENTS_FETCH_FAILED,
} from "../store/types";

function* fetchIncidents() {
  try {
    const incidents = yield call(getIncidents);
    yield put({ type: INCIDENTS_FETCH_SUCCEEDED, incidents: incidents });
  } catch (e) {
    yield put({ type: INCIDENTS_FETCH_FAILED, message: e.message });
  }
}

function* mySaga() {
  yield takeLatest(INCIDENTS_FETCH_REQUESTED, fetchIncidents);
}

export default mySaga;
