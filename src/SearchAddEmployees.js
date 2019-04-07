import React from "react";
import classNames from "classnames";
import Select from "react-select";
// import { makeStyles, useTheme } from '@material-ui/styles';
import { withStyles, withTheme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Chip from "@material-ui/core/Chip";
import MenuItem from "@material-ui/core/MenuItem";
import CancelIcon from "@material-ui/icons/Cancel";
import { emphasize } from "@material-ui/core/styles/colorManipulator";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";

const suggestions = [
  { label: "Afghanistan" },
  { label: "Aland Islands" },
  { label: "Albania" },
  { label: "Algeria" },
  { label: "American Samoa" },
  { label: "Andorra" },
  { label: "Angola" },
  { label: "Anguilla" },
  { label: "Antarctica" },
  { label: "Antigua and Barbuda" },
  { label: "Argentina" },
  { label: "Armenia" },
  { label: "Aruba" },
  { label: "Australia" },
  { label: "Austria" },
  { label: "Azerbaijan" },
  { label: "Bahamas" },
  { label: "Bahrain" },
  { label: "Bangladesh" },
  { label: "Barbados" },
  { label: "Belarus" },
  { label: "Belgium" },
  { label: "Belize" },
  { label: "Benin" },
  { label: "Bermuda" },
  { label: "Bhutan" },
  { label: "Bolivia, Plurinational State of" },
  { label: "Bonaire, Sint Eustatius and Saba" },
  { label: "Bosnia and Herzegovina" },
  { label: "Botswana" },
  { label: "Bouvet Island" },
  { label: "Brazil" },
  { label: "British Indian Ocean Territory" },
  { label: "Brunei Darussalam" }
].map(suggestion => ({
  value: suggestion.label,
  label: suggestion.label
}));

const useStyles = theme => ({
  root: {
    flexGrow: 1,
    // height: 'auto',
    // backgroundColor: theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[900]
    backgroundColor: theme.palette.background.paper,
    display: "flex"
  },
  input: {
    display: "flex",
    padding: 0
  },
  valueContainer: {
    display: "flex",
    flexWrap: "wrap",
    flex: 1,
    alignItems: "center",
    overflow: "hidden"
  },
  chip: {
    margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`
  },
  chipFocused: {
    backgroundColor: emphasize(
      theme.palette.type === "light"
        ? theme.palette.grey[300]
        : theme.palette.grey[700],
      0.08
    )
  },
  noOptionsMessage: {
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`
  },
  singleValue: {
    fontSize: 12
  },
  placeholder: {
    position: "absolute",
    left: 2,
    fontSize: 12
  },
  paper: {
    position: "absolute",
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0,
    fontSize: 12
  },
  divider: {
    height: theme.spacing.unit * 2
  }
});

function NoOptionsMessage(props) {
  return (
    <Typography
      color="textSecondary"
      className={props.selectProps.classes.noOptionsMessage}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}

function inputComponent({ inputRef, ...props }) {
  return <div ref={inputRef} {...props} />;
}

function Control(props) {
  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <TextField
        fullWidth
        InputProps={{
          inputComponent,
          inputProps: {
            className: props.selectProps.classes.input,
            inputRef: props.innerRef,
            children: props.children,
            ...props.innerProps
          }
        }}
        {...props.selectProps.textFieldProps}
      />
    </div>
  );
}

function Option(props) {
  return (
    <MenuItem
      buttonRef={props.innerRef}
      selected={props.isFocused}
      component="div"
      style={{
        // fontWeight: props.isSelected ? 500 : 400,
        fontSize: 12
      }}
      {...props.innerProps}
    >
      {props.children}
    </MenuItem>
  );
}

function Placeholder(props) {
  return (
    <Typography
      color="textSecondary"
      className={props.selectProps.classes.placeholder}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}

// function SingleValue(props) {
//   return (
//     <Typography className={props.selectProps.classes.singleValue, 'allenSV'} {...props.innerProps}>
//       {props.children}
//     </Typography>
//   );
// }

function ValueContainer(props) {
  return (
    <div className={props.selectProps.classes.valueContainer}>
      {props.children}
    </div>
  );
}

function MultiValue(props) {
  return (
    <Chip
      tabIndex={-1}
      label={props.children}
      className={classNames(props.selectProps.classes.chip, {
        [props.selectProps.classes.chipFocused]: props.isFocused
      })}
      onDelete={props.removeProps.onClick}
      deleteIcon={<CancelIcon {...props.removeProps} />}
    />
  );
}

function Menu(props) {
  // console.log(props);
  // props.selectProps.filterOption(() => console.log('filterOption'))
  return (
    <Paper
      square
      className={props.selectProps.classes.paper}
      {...props.innerProps}
    >
      {props.children}
    </Paper>
  );
}

const components = {
  Control,
  NoOptionsMessage,
  Menu,
  MultiValue,
  Option,
  Placeholder,
  // SingleValue,
  ValueContainer
};

const SearchAddEmployees = props => {
  // ALLEN new @material-ui/styles package separate from @material-ui/core/styles
  const { theme, classes } = props;
  // const classes = useStyles(theme)
  console.log(props.employees);

  const [multi, setMulti] = React.useState(null);

  function handleChangeMulti(value) {
    // console.log("selected values ", value);
    setMulti(value);
  }

  const selectStyles = {
    input: base => ({
      ...base,
      color: theme.palette.text.primary,
      "& input": {
        font: "inherit"
      }
    })
  };

  function handleClickAdd() {
    console.log("selected values ", multi);
    setMulti(null);
    props.onClickAdd(multi);
  }

  return (
    <div className={classes.root}>
      <div style={{ flexGrow: 1 }}>
        <Select
          classes={classes}
          styles={selectStyles}
          textFieldProps={{
            label: "",
            InputLabelProps: {
              shrink: true
            }
          }}
          options={props.employees.map(rec => ({
            value: rec.employeeId,
            label: rec.fullname
          }))}
          components={components}
          value={multi}
          onChange={handleChangeMulti}
          placeholder="Select multiple employees"
          isMulti
        />
      </div>
      <div>
        <Fab
          color="primary"
          aria-label="Add"
          size="small"
          onClick={handleClickAdd}
        >
          <AddIcon />
        </Fab>
      </div>
    </div>
  );
};

export default withStyles(useStyles, { withTheme: true })(SearchAddEmployees);
