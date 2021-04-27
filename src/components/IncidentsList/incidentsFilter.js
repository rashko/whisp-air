import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));
const IncidentsFilter = ({ handleCallback }) => {
  const classes = useStyles();
  const [query, setQuery] = useState("");
  const [date, setDate] = useState("");

  const handleChange = (e) => {
    setQuery(e.target.value);
  };
  const handleDate = (e) => {
    setDate(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    handleCallback({ query, date });
  };

  const handleClear = () => {
    setDate("");
    setQuery("");
    handleCallback({ query, date });
  };
  return (
    <form
      className={classes.root}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <TextField
        id="free-text"
        label="Free text search"
        placeholder="Example: evo 2020"
        value={query}
        onChange={handleChange}
        inputProps={{ 'aria-label': 'free-text' }}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        id="date"
        label="Date"
        type="date"
        value={date}
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
        onChange={handleDate}
      />
      <Button onClick={handleSubmit} variant="contained" color="primary">
        Search
      </Button>
      <Button onClick={handleClear} variant="contained" color="secondary">
        Clear
      </Button>
    </form>
  );
};

export default IncidentsFilter;
