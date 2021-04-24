import axios from "axios";
const BASE = "https://bikewise.org/api";
const VERSION = "v2";

export const getIncidents = () => {
  return axios
    .get(`${BASE}/${VERSION}/incidents`)
    .then((response) => response.data);
};
