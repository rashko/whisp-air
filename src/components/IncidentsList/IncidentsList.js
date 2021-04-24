import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Pagination from "@material-ui/lab/Pagination";
import Typography from "@material-ui/core/Typography";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

const IncidentsList = ({ incidents, page, setPage, total }) => {
  const classes = useStyles();

  const handleChange = (event, value) => {
    setPage(value);
  };

  const count = Math.ceil(total / 10);

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Total incidents: {total}
      </Typography>
      <List dense className={classes.root}>
        {incidents.map((incident) => {
          const { id, title, occurred_at } = incident;
          return (
            <ListItem key={id} button>
              <ListItemText id={id} primary={`${title}`} secondary={moment.unix(occurred_at).format('DD/MM/yyyy hh:mm')} />
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
