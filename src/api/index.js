import axios from "axios";
const locations = {
  berlin: "52.4938,13.4553",
  "tel-aviv": "32.0853,34.7818",
};
const BASE = "https://bikewise.org/api";
const VERSION = "v2";
const AREA = "berlin";

export const getIncidents = ({ page = 1, per_page = 10, occurred_after }) => {
  return axios
    .get(
      `${BASE}/${VERSION}/incidents?page=${page}&per_page=${per_page}&occurred_after=${occurred_after}&proximity=${locations[AREA]}&incident_type=theft`
    )
    .then((response) => response.data.incidents);
};

export const getIncidentsTotal = ({ occurred_after }) => {
  return axios
    .get(
      `${BASE}/${VERSION}/locations?occurred_after=${occurred_after}&proximity_square=100&proximity=${locations[AREA]}&all=true`
    )
    .then((response) => response.data.features);
};

export const getIncident = ({ id }) => {
  return axios
    .get(`${BASE}/${VERSION}/incident?id=${id}`)
    .then((response) => response.data.incidents);
};
