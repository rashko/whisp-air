import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Pagination from "@material-ui/lab/Pagination";
import Typography from "@material-ui/core/Typography";
import moment from "moment";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

const IncidentsList = ({
  incidents,
  page,
  setPage,
  total,
  selected,
}) => {
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
      <Typography variant="h6" gutterBottom>
        Total incidents: {total}
      </Typography>
      <List dense className={classes.root}>
        {incidents.map((incident) => {
          const { id, title, updated_at } = incident;
          return (
            <ListItem key={id} selected={id === selected} button onClick={() => handleClick(id)}>
              <ListItemText
                id={id}
                primary={`${title}`}
                secondary={moment.unix(updated_at).format("DD/MM/yyyy hh:mm")}
              />
            </ListItem>
          );
        })}
        <Pagination
          count={count}
          page={page}
          onChange={handleChange}
          shape="rounded"
        />
      </List>
    </>
  );
};

export default IncidentsList;
