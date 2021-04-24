import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { INCIDENTS_FETCH_REQUESTED } from "../store/types";

const List = () => {
  const dispatch = useDispatch();
  const incidents = useSelector((state) => state.incidents);
  console.log(incidents);
  useEffect(() => dispatch({type: INCIDENTS_FETCH_REQUESTED}), []);
  return <div>Hello!!!</div>;
};

export default List;
