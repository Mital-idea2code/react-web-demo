import React from "react";
import TextField from "@material-ui/core/TextField";
import FormHelperText from "@material-ui/core/FormHelperText";
import Grid from "@material-ui/core/Grid";

const CustomInput = ({
  name,
  label,
  inputProps,
  errors,
  sm,
  xs,
  multiline,
  rows,
  type,
  onchange,
  defaultValue,
}) => (
  <Grid item xs={xs} sm={sm}>
    <TextField
      variant="standard"
      defaultValue={defaultValue}
      margin="normal"
      fullWidth
      label={label}
      name={name}
      multiline={multiline}
      rows={rows}
      type={type}
      inputProps={inputProps}
      style={{ height: 40 }}
    />
    <FormHelperText error>{errors}</FormHelperText>
  </Grid>
);

export default CustomInput;
