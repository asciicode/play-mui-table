import React from "react";
import PropTypes from "prop-types";
import { withStyles, makeStyles, useTheme } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";
import classNames from "classnames";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import SearchAddEmployees from "./SearchAddEmployees";
import AddNewDialog from "./AddNewDialog";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import { usePayrollEmployees } from "./hooks/usePayrollEmployees";
import { generatePayrollRows } from "./data/payroll";
import Gavel from "@material-ui/icons/Gavel";
import { CustomTableCell } from "./CustomTableCell";

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

const numberInputProps = classes => {
  return {
    maxLength: 2,
    className: classes.dayTextField,
    pattern: "[0-9]*"
  };
};

function AtzKarlTable(props) {
  const [overtime, setOvertime] = React.useState(false);
  // const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectEmployees, setSelectEmployees] = React.useState();
  const [
    state,
    add,
    removeById,
    changeDayProp,
    recalculate
  ] = usePayrollEmployees();
  const { classes } = props;
  // console.log(state);

  React.useEffect(() => {
    console.log("useEffect here...");
    // const { tableEmployees, remainingEmployees } = ;
    // console.log(tableEmployees);
    // const { tableEmployees, remainingEmployees } = props;
    const { payrollEmployees, remainingEmployees } = generatePayrollRows();
    add(payrollEmployees);
    setSelectEmployees(remainingEmployees);
    return () => {
      console.log("useEffect here unmounting...");
    };
  }, []);

  const handleSearchAddClick = employees => {
    // console.log(employees, state);
    if (employees != null) {
      const addEmps = [];
      employees.forEach(i => {
        const ndx = selectEmployees.findIndex(
          rec => rec.employeeId === i.value
        );
        addEmps.push(selectEmployees[ndx]);
        selectEmployees.splice(ndx, 1);
      });
      // console.log(selectEmployees);
      add(addEmps);
    }
  };
  const handleOvertimeToggle = () => {
    const otime = !overtime;
    setOvertime(otime);
    recalculate(otime);
  };
  const handleDeleteClick = id => {
    // console.log(tableRef.value);
    const ndx = state.findIndex(rec => rec.employeeId === id);
    setSelectEmployees([...selectEmployees, state[ndx]]);
    removeById(id);
    // TODO sorting?
    // let newSelectEmp = [...selectEmployees, state[ndx]];
    // newSelectEmp.sort((a, b) => {
    //   var nameA = a.fullname.toLowerCase(),
    //     nameB = b.fullname.toLowerCase();
    //   if (nameA < nameB)
    //     //sort string ascending
    //     return -1;
    //   if (nameA > nameB) return 1;
    //   return 0; //default return value (no sorting)
    // }
  };
  const handleAddEmployee = form => {
    const rec = prepareForm(form);
    console.log(rec);
    if (form.action === "addToPayroll") add(rec);
    else setSelectEmployees([...selectEmployees, rec]);
  };

  const prepareForm = form => {
    const { lastname, firstname, rate, otMultiplier, sss, philHealth } = form;
    let r = parseFloat(rate).toFixed(2);
    const rec = {
      employeeId: Math.random(10),
      fullname: firstname + " " + lastname,
      jobDescription: "Bundling",
      rate: r,
      otRate: (r * parseFloat(otMultiplier)).toFixed(2),
      sss: parseFloat(sss).toFixed(2),
      philHealth: parseFloat(philHealth).toFixed(2)
    };
    return rec;
  };
  const handleDayChange = (e, employeeId, name) => {
    // console.log('e', e.target.value, employeeId, name)
    if (e.target.validity.valid) {
      changeDayProp({ employeeId, [name]: e.target.value, overtime });
    }
  };

  // function handleClick(event) {
  //   setAnchorEl(event.currentTarget);
  // }
  // function handleClose() {
  //   setAnchorEl(null);
  // }
  // let textInput = React.createRef();
  // console.log(Object.entries(state).length > 0);
  // let tableRef = null;
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
                    colSpan={4}
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
                  <AddNewDialog onSubmit={handleAddEmployee} />
                  {/* <Fab
                    color="secondary"
                    aria-label="Add"
                    size="small"
                    onClick={() => handleAddEmployee()}
                  >
                    <AddIcon />
                  </Fab> */}
                </div>
              </CustomTableCell>
              <CustomTableCell>Worker Description</CustomTableCell>

              <DayTableHeaderCol />
              {overtime && <DayTableHeaderCol />}
              <CustomTableCell>Net Earnings</CustomTableCell>
              <CustomTableCell>SSS</CustomTableCell>
              <CustomTableCell>PhilHealth</CustomTableCell>
              <CustomTableCell />
            </TableRow>
          </TableHead>

          <TableBody>
            {Object.entries(state).length > 0 &&
              state.map(row => (
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
                      className={classNames(
                        classes.dayTextField,
                        classes.dense
                      )}
                      margin="dense"
                      inputProps={numberInputProps}
                      value={row.qtyM}
                      onChange={e => handleDayChange(e, row.employeeId, "qtyM")}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      id="standard-dense"
                      className={classNames(
                        classes.dayTextField,
                        classes.dense
                      )}
                      margin="dense"
                      inputProps={numberInputProps}
                      value={row.qtyT}
                      onChange={e => handleDayChange(e, row.employeeId, "qtyT")}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      id="standard-dense"
                      className={classNames(
                        classes.dayTextField,
                        classes.dense
                      )}
                      margin="dense"
                      inputProps={numberInputProps}
                      value={row.qtyW}
                      onChange={e => handleDayChange(e, row.employeeId, "qtyW")}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      id="standard-dense"
                      className={classNames(
                        classes.dayTextField,
                        classes.dense
                      )}
                      margin="dense"
                      inputProps={numberInputProps}
                      value={row.qtyTh}
                      onChange={e =>
                        handleDayChange(e, row.employeeId, "qtyTh")
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      id="standard-dense"
                      className={classNames(
                        classes.dayTextField,
                        classes.dense
                      )}
                      margin="dense"
                      inputProps={numberInputProps}
                      value={row.qtyF}
                      onChange={e => handleDayChange(e, row.employeeId, "qtyF")}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      id="standard-dense"
                      className={classNames(
                        classes.dayTextField,
                        classes.dense
                      )}
                      margin="dense"
                      inputProps={numberInputProps}
                      value={row.qtyS}
                      onChange={e => handleDayChange(e, row.employeeId, "qtyS")}
                    />
                  </TableCell>
                  <TableCell className={classes.tdCell}>
                    {row.qtyTotal}
                  </TableCell>
                  <TableCell className={classes.tdCell}>
                    {row.totalAmt}
                  </TableCell>

                  {overtime && (
                    <OvertimeTableRowCol
                      row={row}
                      handleDayChange={handleDayChange}
                      classes={classes}
                    />
                  )}

                  <TableCell className={classes.tdCell}>
                    {row.netEarnings}
                  </TableCell>
                  <TableCell className={classes.tdCell}>{row.sss}</TableCell>
                  <TableCell className={classes.tdCell}>
                    {row.philHealth}
                  </TableCell>
                  <TableCell align="center">
                    <IconButton
                      className={classes.button}
                      aria-label="Delete"
                      onClick={() => handleDeleteClick(row.employeeId)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <DialogActions>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            size="small"
            onClick={() => alert("to be confirmed")}
          >
            <Gavel />
            Confirm
          </Button>
        </DialogActions>
      </Paper>
    </Paper>
  );
}

AtzKarlTable.propTypes = {
  classes: PropTypes.object.isRequired
};

function DayTableHeaderCol() {
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
function OvertimeTableRowCol(props) {
  const { classes, row, handleDayChange } = props;
  // console.log(classes);
  return (
    <React.Fragment>
      <TableCell className={classes.tdCell}>{row.otRate}</TableCell>
      <TableCell>
        <TextField
          id="standard-dense"
          className={classNames(classes.dayTextField, classes.dense)}
          margin="dense"
          inputProps={numberInputProps}
          value={row.otQtyM}
          onChange={e => handleDayChange(e, row.employeeId, "otQtyM")}
        />
      </TableCell>
      <TableCell>
        <TextField
          id="standard-dense"
          className={classNames(classes.dayTextField, classes.dense)}
          margin="dense"
          inputProps={numberInputProps}
          value={row.otQtyT}
          onChange={e => handleDayChange(e, row.employeeId, "otQtyT")}
        />
      </TableCell>
      <TableCell>
        <TextField
          id="standard-dense"
          className={classNames(classes.dayTextField, classes.dense)}
          margin="dense"
          inputProps={numberInputProps}
          value={row.otQtyW}
          onChange={e => handleDayChange(e, row.employeeId, "otQtyW")}
        />
      </TableCell>
      <TableCell>
        <TextField
          id="standard-dense"
          className={classNames(classes.dayTextField, classes.dense)}
          margin="dense"
          inputProps={numberInputProps}
          value={row.otQtyTh}
          onChange={e => handleDayChange(e, row.employeeId, "otQtyTh")}
        />
      </TableCell>
      <TableCell>
        <TextField
          id="standard-dense"
          className={classNames(classes.dayTextField, classes.dense)}
          margin="dense"
          inputProps={numberInputProps}
          value={row.otQtyF}
          onChange={e => handleDayChange(e, row.employeeId, "otQtyF")}
        />
      </TableCell>
      <TableCell>
        <TextField
          id="standard-dense"
          className={classNames(classes.dayTextField, classes.dense)}
          margin="dense"
          inputProps={numberInputProps}
          value={row.otQtyS}
          onChange={e => handleDayChange(e, row.employeeId, "otQtyS")}
        />
      </TableCell>
      <TableCell className={classes.tdCell}>{row.otQtyTotal}</TableCell>
      <TableCell className={classes.tdCell}>{row.otTotalAmt}</TableCell>
    </React.Fragment>
  );
}

export default withStyles(stylez, { withTheme: true })(AtzKarlTable);
