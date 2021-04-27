import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  INCIDENTS_FETCH_REQUESTED,
  SET_SEARCH_PARAMS,
} from "../../store/types";
import IncidentsList from "./IncidentsList";
import IncidentsFilter from "./incidentsFilter";
import moment from "moment";

const IncidentsListContainer = () => {
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const incidents = useSelector((state) => state.incidents.incidents);
  const total = useSelector((state) => state.incidents.total);
  const query = useSelector((state) => state.incidents.query);
  const date = useSelector((state) => state.incidents.date);
  const isFetching = useSelector((state) => state.incidents.isFetching);

  useEffect(() => {
    const occurred_before = !!date && moment.utc(date).endOf("day").format('X');
    const occurred_after = !!date && moment.utc(date).startOf("day").format('X');
    return dispatch({
      type: INCIDENTS_FETCH_REQUESTED,
      page,
      query,
      occurred_before,
      occurred_after,
    });
  }, [dispatch, page, query, date]);

  const handleCallback = ({ query, date }) => {
    dispatch({ type: SET_SEARCH_PARAMS, query, date });
  };

  return (
    <div>
      <IncidentsFilter handleCallback={handleCallback} />
      <IncidentsList
        incidents={incidents}
        page={page}
        setPage={setPage}
        total={total}
        isFetching={isFetching}
      />
    </div>
  );
};

export default IncidentsListContainer;
