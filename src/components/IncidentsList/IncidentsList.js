import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Pagination from "@material-ui/lab/Pagination";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useHistory } from "react-router-dom";
import { formatDate } from "../../utils";

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
            Total incidents: {total}
          </Typography>
          <List dense className={classes.root}>
            {incidents.map((incident) => {
              const { id, title, occurred_at } = incident;
              return (
                <ListItem key={id} button onClick={() => handleClick(id)}>
                  <ListItemText
                    id={id}
                    primary={`${title}`}
                    secondary={formatDate(occurred_at)}
                  />
                </ListItem>
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
