import axios from "axios";
const locations = {
  berlin: "52.4938,13.4553",
  "tel-aviv": "32.0853,34.7818",
};
const BASE = "https://bikewise.org/api";
const VERSION = "v2";
const AREA = "berlin";

export const getIncidents = ({
  page = 1,
  per_page = 10,
  query,
  occurred_before,
  occurred_after,
}) => {
  const params = {
    page,
    per_page,
    incident_type: "theft",
    proximity: locations[AREA],
  };
  if (!!query) {
    params["query"] = query;
  }

  if (!!occurred_before) {
    params["occurred_before"] = occurred_before;
  }

  if (!!occurred_after) {
    params["occurred_after"] = occurred_after;
  }

  let url = new URLSearchParams(params).toString();
  return axios
    .get(`${BASE}/${VERSION}/incidents?${url}`)
    .then((response) => response.data.incidents);
};

export const getIncidentsTotal = ({ occurred_after, occurred_before, query }) => {
  const params = {
    proximity_square: 100,
    proximity: locations[AREA],
    all: true,
  };
  if (!!occurred_before) {
    params["occurred_before"] = occurred_before;
  }

  if (!!occurred_after) {
    params["occurred_after"] = occurred_after;
  }

  if (!!query) {
    params["query"] = query;
  }

  let url = new URLSearchParams(params).toString();
  return axios
    .get(`${BASE}/${VERSION}/locations?${url}`)
    .then((response) => response.data.features);
};

export const getIncident = ({ id }) => {
  return axios
    .get(`${BASE}/${VERSION}/incidents/${id}`)
    .then((response) => response.data.incident);
};
