import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  INCIDENTS_FETCH_REQUESTED,
  SET_SEARCH_PARAMS,
} from "../../store/types";
import Snackbar from "@material-ui/core/Snackbar";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { makeStyles } from "@material-ui/core/styles";
import IncidentsList from "./IncidentsList";
import IncidentsFilter from "./IncidentsFilter";
import Alert from "../Alert/Alert";
import { occurredDate } from "../../utils";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },

  title: {
    flexGrow: 1,
  },
}));
const IncidentsListContainer = () => {
  const classes = useStyles();
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const incidents = useSelector((state) => state.incidents.incidents);
  const total = useSelector((state) => state.incidents.total);
  const query = useSelector((state) => state.incidents.query);
  const date = useSelector((state) => state.incidents.date);
  const isFetching = useSelector((state) => state.incidents.isFetching);
  const errorFetching = useSelector((state) => state.incidents.errorFetching);

  useEffect(() => {
    const occurred_before = occurredDate({ date, beforeOrAfter: true });
    const occurred_after = occurredDate({ date, beforeOrAfter: false });

    return dispatch({
      type: INCIDENTS_FETCH_REQUESTED,
      page,
      query,
      occurred_before,
      occurred_after,
    });
  }, [dispatch, page, query, date]);

  useEffect(() => {
    if (errorFetching) {
      setOpen(true);
    }
  }, [dispatch, errorFetching]);

  const handleCallback = ({ query, date }) => {
    dispatch({ type: SET_SEARCH_PARAMS, query, date });
    setPage(1);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            List of stolen bikes in Berlin
          </Typography>
        </Toolbar>
      </AppBar>
      <IncidentsFilter handleCallback={handleCallback} />
      <IncidentsList
        incidents={incidents}
        page={page}
        setPage={setPage}
        total={total}
        isFetching={isFetching}
      />
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          There was an error fetching data
        </Alert>
      </Snackbar>
    </>
  );
};

export default IncidentsListContainer;
