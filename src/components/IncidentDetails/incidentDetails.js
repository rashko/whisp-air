import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import { useSelector, useDispatch } from "react-redux";
import Map from "./map";

const IncidentDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const incident = useSelector((state) => state.incidents.selectedIncident);
  const geometry = useSelector((state) => state.incidents.geometry)

  useEffect(() => {
    dispatch({ type: "SET_SELECTED_INCIDENT", id: Number(id) });
  }, [id, dispatch]);

  if (!incident) {
    return null;
  }

  const { title, description, occurred_at, updated_at, media } = incident;
  const incidentCoords = geometry[id].coordinates;

  const image_url = media?.image_url;

  return (
    <>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <Typography variant="caption" display="block" gutterBottom>
        occurred at: {occurred_at} | reported at: {updated_at}
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
