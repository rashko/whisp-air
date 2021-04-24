import "./App.css";
import IncidentsListContainer from "./components/IncidentsList/IncidentsListContainer";
import IncidentDetails from "./components/IncidentDetails/incidentDetails";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
}));

function App() {
  const classes = useStyles();
  return (
    <Router>
      <Container>
        <div className={classes.root}>
          <Grid container spacing={3}>
            <Grid item xs>
              <IncidentsListContainer />
            </Grid>
            <Grid item xs={6}>
              <Switch>
                <Route path="/incident/:id" children={<IncidentDetails />} />
              </Switch>
            </Grid>
          </Grid>
        </div>
      </Container>
    </Router>
  );
}

export default App;
