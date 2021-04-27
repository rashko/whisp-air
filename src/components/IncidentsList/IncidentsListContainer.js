import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  INCIDENTS_FETCH_REQUESTED,
  SET_SEARCH_PARAMS,
} from "../../store/types";
import IncidentsList from "./IncidentsList";
import IncidentsFilter from "./IncidentsFilter";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "../Alert/Alert";
import { occurredDate } from "../../utils";
import Typography from "@material-ui/core/Typography";

const IncidentsListContainer = () => {
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
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <>
      <Typography variant="h2" gutterBottom>
        List of stolen bikes in Berlin
      </Typography>
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
