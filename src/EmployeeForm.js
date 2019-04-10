import React from "react";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
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
  const [form, setForm] = React.useState({
    lastname: "",
    firstname: "",
    rate: "",
    otMultiplier: "",
    sss: "",
    philHealth: ""
  });
  const { classes } = props;
  // console.log(form);

  const handleChange = event => {
    setForm({
      ...form,
      [event.target.id]: event.target.value
    });
  };

  const handleAmountChange = event => {
    if (
      !isNaN(parseFloat(event.target.value, 10)) ||
      event.target.value === ""
    ) {
      setForm({
        ...form,
        [event.target.id]: event.target.value
      });
    }
  };
  const handleAmountBlur = event => {
    // console.log(parseFloat(event.target.value, 10));
    if (!isNaN(parseFloat(event.target.value, 10))) {
      setForm({
        ...form,
        [event.target.id]: parseFloat(event.target.value, 10).toFixed(2)
      });
    }
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
          value={form.lastname}
          onChange={handleChange}
        />
        <TextField
          id="firstname"
          label="Firstname(s)"
          margin="normal"
          fullWidth
          value={form.firstname}
          onChange={handleChange}
        />
        <TextField
          id="rate"
          label="Rate"
          margin="normal"
          fullWidth
          value={form.rate}
          onChange={handleAmountChange}
          onBlur={handleAmountBlur}
        />
        <TextField
          id="otMultiplier"
          label="OT multiplier"
          margin="normal"
          fullWidth
          value={form.otMultiplier}
          onChange={handleAmountChange}
          onBlur={handleAmountBlur}
        />
        <TextField
          id="sss"
          label="SSS"
          margin="normal"
          fullWidth
          value={form.sss}
          onChange={handleAmountChange}
          onBlur={handleAmountBlur}
        />
        <TextField
          id="philHealth"
          label="PhilHealth"
          margin="normal"
          fullWidth
          value={form.philHealth}
          onChange={handleAmountChange}
          onBlur={handleAmountBlur}
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
