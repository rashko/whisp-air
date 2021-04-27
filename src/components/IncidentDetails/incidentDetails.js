import React, { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { INCIDENT_FETCH_REQUESTED } from "../../store/types";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import { formatDate } from "../../utils";
import Map from "./Map";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    marginTop: theme.spacing(2),
    color: theme.palette.text.secondary,
  },
}));
const IncidentDetails = () => {
  const classes = useStyles();
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
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            {title}
          </Typography>
          <Button color="inherit" onClick={() => history.push("/")}>
            Back
          </Button>
        </Toolbar>
      </AppBar>
      <Grid container spacing={3}>
        <Grid item sm={4} xs={12} >
          <Paper className={classes.paper}>
            {image_url && (
              <img alt={title} src={image_url} style={{ maxWidth: "100%" }} />
            )}
          </Paper>
        </Grid>
        <Grid item sm={4} xs={12}>
          <Paper className={classes.paper}>
            <Typography variant="subtitle1" display="block" gutterBottom>
              <strong>Occurred at:</strong> {formatDate(occurred_at)}
            </Typography>
            <Typography variant="subtitle1" display="block" gutterBottom>
              <strong>Reported at:</strong> {formatDate(updated_at)}
            </Typography>
            <Typography variant="subtitle1" display="block" gutterBottom>
              <strong>Description:</strong> {description}
            </Typography>
          </Paper>
        </Grid>
        <Grid item sm={4} xs={12}>
          <Paper className={classes.paper}>
            <Map
              isMarkerShown
              googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
              loadingElement={<div style={{ height: `100%` }} />}
              containerElement={<div style={{ height: `400px` }} />}
              mapElement={<div style={{ height: `100%` }} />}
              lat={incidentCoords[1]}
              lng={incidentCoords[0]}
            />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default IncidentDetails;
