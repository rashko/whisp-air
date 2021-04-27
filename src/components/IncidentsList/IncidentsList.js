import React from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import Pagination from "@material-ui/lab/Pagination";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import IncidentListItem from "./IncidentListItem";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

const IncidentsList = ({ incidents, page, setPage, total, isFetching }) => {
  const classes = useStyles();
  const history = useHistory();

  const handleChange = (event, value) => {
    setPage(value);
  };

  const handleClick = (id) => {
    history.push(`/incident/${id}`);
  };

  const count = Math.ceil(total / 10);

  return (
    <>
      {isFetching && <CircularProgress />}
      {!isFetching && (
        <>
          <Typography variant="h6" gutterBottom>
            {total > 0 ? `Total incidents: ${total}` : "No results found"}
          </Typography>
          <List dense className={classes.root}>
            {incidents.map((incident, index) => {
              const {
                id,
                title,
                occurred_at,
                media: { image_url_thumb },
              } = incident;
              return (
                <IncidentListItem
                  key={id}
                  id={id}
                  title={title}
                  occurred_at={occurred_at}
                  image_url_thumb={image_url_thumb}
                  index={index}
                  handleClick={handleClick}
                />
              );
            })}
            {count > 0 && (
              <Pagination
                count={count}
                page={page}
                onChange={handleChange}
                shape="rounded"
              />
            )}
          </List>
        </>
      )}
    </>
  );
};

export default IncidentsList;
