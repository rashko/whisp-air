import "./App.css";
import IncidentsListContainer from "./components/IncidentsList/IncidentsListContainer";
import IncidentDetails from "./components/IncidentDetails/IncidentDetails";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import {
  createMuiTheme,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core/styles";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./store";
import mySaga from "./sagas";

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware))
);
sagaMiddleware.run(mySaga);

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#35baf6",
      main: "#03a9f4",
      dark: "#0276aa",
      contrastText: "#fff",
    },
    secondary: {
      light: "#e0e0e0",
      main: "#bdbdbd",
      dark: "#9e9e9e",
      contrastText: "#fff",
    },
  },
});

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
}));

function App() {
  const classes = useStyles();
  return (
    <Provider store={store}>
      <Router>
        <ThemeProvider theme={theme}>
          <Container>
            <div className={classes.root}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Switch>
                    <Route
                      exact
                      path="/"
                      children={<IncidentsListContainer />}
                    />
                    <Route
                      path="/incident/:id"
                      children={<IncidentDetails />}
                    />
                  </Switch>
                </Grid>
              </Grid>
            </div>
          </Container>
        </ThemeProvider>
      </Router>
    </Provider>
  );
}

export default App;
