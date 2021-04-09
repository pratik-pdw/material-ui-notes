import React, { useState } from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import { FormControlLabel, makeStyles, FormControl, FormLabel } from '@material-ui/core'
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  field: {
    marginTop: 20,
    marginBottom: 20,
    display: 'block'
  }
})

export default function Create() {

  const classes = useStyles();
  const [title, setTitle] = useState("")
  const [details, setDetails] = useState("")
  const [titleError, setTitleError] = useState(false)
  const [detailsError, setDetailsError] = useState(false)
  const [category, setCategory] = useState("money")
  const history = useHistory()

  const handleSubmit = e => {
    e.preventDefault();

    if (title === '') {
      setTitleError(true)
    }

    if (details === '') {
      setDetailsError(true)
    }

    if (title && details) {
      setTitleError(false)
      setDetailsError(false)
      fetch('http://localhost:8050/notes',
        {
          method: 'POST',
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ details, title, category })
        })
        .then(res => res.json()).then(data => {
          history.push('/')
        })
    }
  }

  return (
    <Container>
      <Typography
        variant="h6"
        component="h2"
        gutterBottom
        color="textSecondary"
      >
        Create a New Note
      </Typography>


      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <TextField
          onChange={(e) => { setTitle(e.target.value) }}
          className={classes.field}
          fullWidth
          required
          variant="outlined"
          color="secondary"
          label="Note Title"
          error={titleError}
        />
        <TextField
          onChange={(e) => { setDetails(e.target.value) }}
          className={classes.field}
          multiline
          rows={4}
          fullWidth
          required
          variant="outlined"
          color="secondary"
          label="Details"
          error={detailsError}
        />

        <FormControl className={classes.field}>
          <Typography color="textSecondary">Note Category</Typography>
          <RadioGroup value={category}
            onChange={(e) => { setCategory(e.target.value) }}>
            <FormControlLabel value="money" control={<Radio />} label="Money"></FormControlLabel>
            <FormControlLabel value="todos" control={<Radio />} label="Todos"></FormControlLabel>
            <FormControlLabel value="reminders" control={<Radio />} label="Reminders"></FormControlLabel>
            <FormControlLabel value="work" control={<Radio />} label="Work"></FormControlLabel>
          </RadioGroup>
        </FormControl>
        <Button
          endIcon={<KeyboardArrowRightIcon />}
          color="secondary"
          variant="contained"
          type="submit">Submit</Button>
      </form>


    </Container>
  );
}
