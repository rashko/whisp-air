import React, { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import { useSelector, useDispatch } from "react-redux";
import Button from "@material-ui/core/Button";
import Map from "./map";
import { formatDate } from "../../utils";
import { INCIDENT_FETCH_REQUESTED } from "../../store/types";

const IncidentDetails = () => {
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const incident = useSelector((state) => state.incidents.selectedIncident);
  const geometry = useSelector((state) => state.incidents.geometry);
  
  useEffect(() => {
    dispatch({ type: INCIDENT_FETCH_REQUESTED, id });
  }, [id, dispatch]);

  if (!incident) {
    return null;
  }

  const { title, description, occurred_at, updated_at, media } = incident;
  const incidentCoords = geometry[id].coordinates;

  const image_url = media?.image_url;

  return (
    <>
      <Button onClick={() => history.push("/")} variant="contained">
        Back
      </Button>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <Typography variant="caption" display="block" gutterBottom>
        occurred at: {formatDate(occurred_at)} | reported at:{" "}
        {formatDate(updated_at)}
      </Typography>
      <Typography variant="body1" gutterBottom>
        {description}
      </Typography>
      {image_url && (
        <img alt={title} src={image_url} style={{ maxWidth: "100%" }} />
      )}
      <Map
        isMarkerShown
        googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `400px` }} />}
        mapElement={<div style={{ height: `100%` }} />}
        lat={incidentCoords[1]}
        lng={incidentCoords[0]}
      />
    </>
  );
};

export default IncidentDetails;
