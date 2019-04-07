import React from "react";
import PropTypes from "prop-types";
import { withStyles, makeStyles, useTheme } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Icon from "@material-ui/core/Icon";
import red from "@material-ui/core/colors/red";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";
import classNames from "classnames";
import InputBase from "@material-ui/core/InputBase";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { onKeyUpAmount } from "./utils/handy";
import SearchAddEmployees from "./SearchAddEmployees";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import { usePayrollEmployees } from "./utils/hooks";
import { AppContext } from ".";

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.common.black
        : theme.palette.common.black,
    color:
      theme.palette.type === "light"
        ? theme.palette.common.white
        : theme.palette.common.white,
    fontSize: 12,
    whiteSpace: "nowrap"
  },
  root: {
    paddingLeft: 5
  }
}))(TableCell);

const stylez = theme => ({
  input: base => ({
    ...base,
    color: theme.palette.text.primary,
    "& input": {
      font: "inherit"
    }
  }),
  tableWrap: {
    // display: 'flex',
    borderRadius: 4,
    justifyCenter: "center",
    backgroundColor: theme.palette.background.paper,
    padding: 24
  },
  tableRowHover: {
    "&:hover": {
      backgroundColor:
        theme.palette.type === "light"
          ? theme.palette.grey[200]
          : theme.palette.grey[900]
    }
  },
  root: {
    width: "100%",
    marginTop: theme.spacing.unit,
    overflowX: "auto"
  },
  table: {
    minWidth: 700
  },
  row: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.background.default
    }
  },
  overtimeBox: {
    border: "1px solid white"
  },
  dayTextField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 30,
    fontSize: 12
  },
  InputProps: {
    textAlign: "center"
  },
  dense: {
    // marginTop: 19,
  },
  divTableTop: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  tdCell: {
    paddingLeft: 5,
    paddingRight: 5,
    textAlign: "right"
  }
});

function AtzKarlTable(props) {
  const { payrollEmployees, remainingEmployees } = React.useContext(AppContext);
  const [overtime, setOvertime] = React.useState(false);
  // const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectEmployees, setSelectEmployees] = React.useState(
    remainingEmployees
  );
  const [state, add, addAll] = usePayrollEmployees(payrollEmployees);
  const { classes } = props;
  // const { payrollEmployees, remainingEmployees } = state;
  console.log(selectEmployees);

  React.useEffect(() => {
    console.log("useEffect here...");
    // const { tableEmployees, remainingEmployees } = ;
    // console.log(tableEmployees);
    // const { tableEmployees, remainingEmployees } = props;
    return () => {
      console.log("useEffect here unmounting...");
    };
  }, []);

  const handleSearchAddClick = employees => {
    console.log(employees, state);
    console.log(selectEmployees);

    const newSelEmployees = [];
    const addEmps = [];
    let done = false;
    employees.forEach(i => {
      selectEmployees.forEach(j => {
        if (j.employeeId === i.value) {
          addEmps.push(j);
        }
        // TODOs
        if (i.value !== j.employeeId) {
          console.log("pop ", j.fullname);
          // newSelEmployees.push(j);
          // selectEmployees.pop(j);
        }
      });

      done = true;
    });
    console.log(newSelEmployees);
    // setSelectEmployees(newSelEmployees);
    addAll(addEmps);
    // employees.forEach(element => {
    //   const selEmp = selectEmployees.find(
    //     rec => rec.employeeId === element.value
    //   );
    //   add(selEmp);
    // setSelectEmployees();

    //   console.log(
    //     element,
    // selectEmployees,
    //     setSelectEmployees(
    //       selectEmployees.filter(rec => rec.employeeId !== element.value)
    //     )
    //   );
    // });
  };
  const handleOvertimeToggle = () => {
    setOvertime(!overtime);
  };
  // function handleClick(event) {
  //   setAnchorEl(event.currentTarget);
  // }
  // function handleClose() {
  //   setAnchorEl(null);
  // }
  // let textInput = React.createRef();
  // console.log(textInput);

  return (
    <Paper className={classes.tableWrap}>
      <div className={classes.divTableTop}>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={overtime}
                onChange={handleOvertimeToggle}
                value=""
              />
            }
            label="Overtime"
          />
        </FormGroup>
        <SearchAddEmployees
          employees={selectEmployees}
          onClickAdd={handleSearchAddClick}
        />
      </div>
      <Paper className={classes.root}>
        <Table className={classes.table}>
          {overtime && (
            <React.Fragment>
              <TableHead>
                <TableRow>
                  <CustomTableCell
                    colSpan={2}
                    className={classes.overtimeBox}
                  />
                  <CustomTableCell
                    colSpan={9}
                    align="center"
                    className={classes.overtimeBox}
                  >
                    Ordinary
                  </CustomTableCell>
                  <CustomTableCell
                    colSpan={9}
                    align="center"
                    className={classes.overtimeBox}
                  >
                    Overtime
                  </CustomTableCell>
                  <CustomTableCell
                    colSpan={3}
                    className={classes.overtimeBox}
                  />
                </TableRow>
              </TableHead>
            </React.Fragment>
          )}
          <TableHead>
            <TableRow>
              <CustomTableCell>
                Employee
                <div style={{ display: "inline-block" }}>
                  <Fab color="secondary" aria-label="Add" size="small">
                    <AddIcon />
                  </Fab>
                </div>
              </CustomTableCell>
              <CustomTableCell>Worker Description</CustomTableCell>

              <CustomTableCell>Rate</CustomTableCell>
              <CustomTableCell>M</CustomTableCell>
              <CustomTableCell>T</CustomTableCell>
              <CustomTableCell>W</CustomTableCell>
              <CustomTableCell>Th</CustomTableCell>
              <CustomTableCell>F</CustomTableCell>
              <CustomTableCell>S</CustomTableCell>
              <CustomTableCell>No. of Hrs</CustomTableCell>
              <CustomTableCell>Total Amt</CustomTableCell>
              {overtime && otTableHeaderCol()}
              <CustomTableCell>Net Earnings</CustomTableCell>
              <CustomTableCell>SSS</CustomTableCell>
              <CustomTableCell>PhilHealth</CustomTableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {state.map(row => (
              <TableRow
                className={classNames(classes.row, classes.tableRowHover)}
                key={row.employeeId}
              >
                <TableCell component="td" scope="row">
                  {row.fullname}
                </TableCell>
                <TableCell>{row.jobDescription}</TableCell>
                <TableCell className={classes.tdCell}>{row.rate}</TableCell>
                <TableCell>
                  <TextField
                    id="standard-dense"
                    className={classNames(classes.dayTextField, classes.dense)}
                    margin="dense"
                    onKeyUp={onKeyUpAmount}
                    inputProps={{
                      maxLength: 2,
                      onKeyUp: onKeyUpAmount,
                      className: classNames(classes.dayTextField)
                    }}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    id="standard-dense"
                    className={classNames(classes.dayTextField, classes.dense)}
                    margin="dense"
                    inputProps={{
                      maxLength: 2,
                      onKeyUp: onKeyUpAmount,
                      className: classNames(classes.dayTextField)
                    }}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    id="standard-dense"
                    className={classNames(classes.dayTextField, classes.dense)}
                    margin="dense"
                    inputProps={{
                      maxLength: 2,
                      onKeyUp: onKeyUpAmount,
                      className: classNames(classes.dayTextField)
                    }}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    id="standard-dense"
                    className={classNames(classes.dayTextField, classes.dense)}
                    margin="dense"
                    inputProps={{
                      maxLength: 2,
                      onKeyUp: onKeyUpAmount,
                      className: classNames(classes.dayTextField)
                    }}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    id="standard-dense"
                    className={classNames(classes.dayTextField, classes.dense)}
                    margin="dense"
                    inputProps={{
                      maxLength: 2,
                      onKeyUp: onKeyUpAmount,
                      className: classNames(classes.dayTextField)
                    }}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    id="standard-dense"
                    className={classNames(classes.dayTextField, classes.dense)}
                    margin="dense"
                    inputProps={{
                      maxLength: 2,
                      onKeyUp: onKeyUpAmount,
                      className: classNames(classes.dayTextField)
                    }}
                  />
                </TableCell>
                <TableCell className={classes.tdCell}>{row.carbs}</TableCell>
                <TableCell className={classes.tdCell}>{row.carbs}</TableCell>

                {overtime && otTableRowCol(props, row)}

                <TableCell className={classes.tdCell}>{row.carbs}</TableCell>
                <TableCell className={classes.tdCell}>{row.carbs}</TableCell>
                <TableCell className={classes.tdCell}>{row.carbs}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Paper>
  );
}

AtzKarlTable.propTypes = {
  classes: PropTypes.object.isRequired
};

function otTableHeaderCol() {
  return (
    <React.Fragment>
      <CustomTableCell>Rate</CustomTableCell>
      <CustomTableCell>M</CustomTableCell>
      <CustomTableCell>T</CustomTableCell>
      <CustomTableCell>W</CustomTableCell>
      <CustomTableCell>Th</CustomTableCell>
      <CustomTableCell>F</CustomTableCell>
      <CustomTableCell>S</CustomTableCell>
      <CustomTableCell>No. of Hrs</CustomTableCell>
      <CustomTableCell>Total Amt</CustomTableCell>
    </React.Fragment>
  );
}
function otTableRowCol(props, row) {
  const { classes } = props;
  return (
    <React.Fragment>
      <TableCell className={classes.tdCell}>{row.otRate}</TableCell>
      <TableCell>
        <TextField
          id="standard-dense"
          className={classNames(classes.dayTextField, classes.dense)}
          margin="dense"
          inputProps={{
            maxLength: 2,
            onKeyUp: onKeyUpAmount,
            className: classNames(classes.dayTextField)
          }}
        />
      </TableCell>
      <TableCell>
        <TextField
          id="standard-dense"
          className={classNames(classes.dayTextField, classes.dense)}
          margin="dense"
          inputProps={{
            maxLength: 2,
            onKeyUp: onKeyUpAmount,
            className: classNames(classes.dayTextField)
          }}
        />
      </TableCell>
      <TableCell>
        <TextField
          id="standard-dense"
          className={classNames(classes.dayTextField, classes.dense)}
          margin="dense"
          inputProps={{
            maxLength: 2,
            onKeyUp: onKeyUpAmount,
            className: classNames(classes.dayTextField)
          }}
        />
      </TableCell>
      <TableCell>
        <TextField
          id="standard-dense"
          className={classNames(classes.dayTextField, classes.dense)}
          margin="dense"
          inputProps={{
            maxLength: 2,
            onKeyUp: onKeyUpAmount,
            className: classNames(classes.dayTextField)
          }}
        />
      </TableCell>
      <TableCell>
        <TextField
          id="standard-dense"
          className={classNames(classes.dayTextField, classes.dense)}
          margin="dense"
          inputProps={{
            maxLength: 2,
            onKeyUp: onKeyUpAmount,
            className: classNames(classes.dayTextField)
          }}
        />
      </TableCell>
      <TableCell>
        <TextField
          id="standard-dense"
          className={classNames(classes.dayTextField, classes.dense)}
          margin="dense"
          inputProps={{
            maxLength: 2,
            onKeyUp: onKeyUpAmount,
            className: classNames(classes.dayTextField)
          }}
        />
      </TableCell>
      <TableCell className={classes.tdCell}>{row.carbs}</TableCell>
      <TableCell className={classes.tdCell}>{row.protein}</TableCell>
    </React.Fragment>
  );
}

export default withStyles(stylez, { withTheme: true })(AtzKarlTable);
