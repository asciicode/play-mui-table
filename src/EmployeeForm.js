import React from "react";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import { onKeyUpAmount } from "./utils/handy";
import classNames from "classnames";
import SaveIcon from "@material-ui/icons/Save";
import PersonAdd from "@material-ui/icons/PersonAdd";

const useStyles = theme => ({
  root: {
    flexGrow: 1,
    height: 500,
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[200]
        : theme.palette.grey[900]
  },
  input: base => ({
    ...base,
    color: theme.palette.text.primary,
    "& input": {
      font: "inherit"
    }
  }),
  button: {
    margin: theme.spacing.unit
  },
  leftIcon: {
    marginRight: theme.spacing.unit
  },
  rightIcon: {
    marginLeft: theme.spacing.unit
  },
  iconSmall: {
    fontSize: 20
  }
});

const EmployeeForm = props => {
  const [form, setForm] = React.useState({});
  const { classes } = props;
  // console.log(form);

  const handleChange = event => {
    // console.log(event.target.value, event.target.id);
    setForm({
      ...form,
      [event.target.id]: event.target.value
    });
  };
  const handleSubmit = action => {
    console.log(action);

    props.onSubmit({
      ...form,
      action: action
    });
  };
  return (
    <div className={classes.root}>
      <form noValidate autoComplete="off">
        <TextField
          id="lastname"
          label="Lastname"
          margin="normal"
          fullWidth
          onChange={handleChange}
        />
        <TextField
          id="firstname"
          label="Firstname(s)"
          margin="normal"
          fullWidth
          onChange={handleChange}
        />
        <TextField
          id="rate"
          label="Rate"
          margin="normal"
          fullWidth
          onKeyUp={onKeyUpAmount}
          onChange={handleChange}
        />
        <TextField
          id="otMultiplier"
          label="OT multiplier"
          margin="normal"
          fullWidth
          onKeyUp={onKeyUpAmount}
          onChange={handleChange}
        />
        <TextField
          id="sss"
          label="SSS"
          margin="normal"
          fullWidth
          onKeyUp={onKeyUpAmount}
          onChange={handleChange}
        />
        <TextField
          id="philHealth"
          label="PhilHealth"
          margin="normal"
          fullWidth
          onKeyUp={onKeyUpAmount}
          onChange={handleChange}
        />

        <DialogActions>
          <Button
            variant="contained"
            color="secondary"
            className={classes.button}
            size="small"
            onClick={handleSubmit}
          >
            <SaveIcon
              className={classNames(classes.leftIcon, classes.iconSmall)}
            />
            Save
          </Button>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            size="small"
            onClick={() => handleSubmit("addToPayroll")}
          >
            <PersonAdd />
            Add to Payroll
          </Button>
        </DialogActions>
      </form>
    </div>
  );
};

export default withStyles(useStyles, { withTheme: true })(EmployeeForm);
