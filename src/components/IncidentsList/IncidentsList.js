import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Pagination from "@material-ui/lab/Pagination";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import Divider from "@material-ui/core/Divider";
import Avatar from "@material-ui/core/Avatar";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import DirectionsBikeIcon from "@material-ui/icons/DirectionsBike";
import { useHistory } from "react-router-dom";
import { formatDate } from "../../utils";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
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
                <>
                  <ListItem key={id} button onClick={() => handleClick(id)}>
                    <ListItemText
                      id={id}
                      primary={`${title}`}
                      secondary={formatDate(occurred_at)}
                    />
                    <ListItemAvatar>
                      {image_url_thumb && (
                        <Avatar
                          alt={title}
                          src={image_url_thumb}
                          className={classes.large}
                          variant="rounded"
                        />
                      )}
                      {!image_url_thumb && (
                        <Avatar
                          alt={title}
                          className={classes.large}
                          variant="rounded"
                        >
                          <DirectionsBikeIcon style={{ fontSize: 50 }} />
                        </Avatar>
                      )}
                    </ListItemAvatar>
                  </ListItem>
                  {index < 9 && <Divider variant="inset" component="li" />}
                </>
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
