import React from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
export default function Create() {
  return (
    <div>
      <Typography
        variant="h6"
        component="h2"
        gutterBottom
        color="textSecondary"
      >
        Create a New Note
      </Typography>

      <Button type="submit" color="primary">
        Submit
      </Button>
      <Button variant="outlined" type="submit" color="primary">
        Submit
      </Button>
    </div>
  );
}
