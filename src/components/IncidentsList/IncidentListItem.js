import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import DirectionsBikeIcon from "@material-ui/icons/DirectionsBike";
import Divider from "@material-ui/core/Divider";
import { makeStyles } from "@material-ui/core/styles";
import { formatDate } from "../../utils";

const useStyles = makeStyles((theme) => ({
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));

const IncidentListItem = ({
  id,
  title,
  occurred_at,
  image_url_thumb,
  index,
  handleClick,
}) => {
  const classes = useStyles();
  return (
    <>
      <ListItem button onClick={() => handleClick(id)}>
        <ListItemText
          id={id}
          primary={`${title}`}
          secondary={formatDate(occurred_at)}
        />
        <ListItemAvatar>
          {image_url_thumb ? (
            <Avatar
              alt={title}
              src={image_url_thumb}
              className={classes.large}
              variant="rounded"
            />
          ) : (
            <Avatar alt={title} className={classes.large} variant="rounded">
              <DirectionsBikeIcon style={{ fontSize: 50 }} />
            </Avatar>
          )}
        </ListItemAvatar>
      </ListItem>
      {index < 9 && <Divider variant="middle" component="li" />}
    </>
  );
};

export default IncidentListItem;
