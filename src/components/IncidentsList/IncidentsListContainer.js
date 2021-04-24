import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import { INCIDENTS_FETCH_REQUESTED } from "../../store/types";
import IncidentsList from "./IncidentsList";

const IncidentsListContainer = () => {
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const incidents = useSelector((state) => state.incidents.incidents);
  const total = useSelector((state) => state.incidents.total);
  const selected = useSelector((state) => state.incidents.selectedIncident);
  const occurredAfter = moment().subtract(1, "year").startOf("day").unix();
  useEffect(
    () => dispatch({ type: INCIDENTS_FETCH_REQUESTED, page, occurredAfter }),
    [dispatch, page, occurredAfter]
  );

  return (
    <div>
      <IncidentsList
        incidents={incidents}
        page={page}
        setPage={setPage}
        total={total}
        selected={selected?.id}
      />
    </div>
  );
};

export default IncidentsListContainer;
