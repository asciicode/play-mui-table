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
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import { onKeyUpAmount } from "./utils/handy";
import SearchAddEmployees from "./SearchAddEmployees";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import { usePayrollEmployees } from "./utils/hooks";
// import { AppContext } from ".";
import { generatePayrollRows } from "./data/payroll";

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
  const [overtime, setOvertime] = React.useState(false);
  // const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectEmployees, setSelectEmployees] = React.useState();
  const [state, add, removeById] = usePayrollEmployees();
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
    setOvertime(!overtime);
  };
  const handleDeleteClick = id => {
    const ndx = state.findIndex(rec => rec.employeeId === id);
    let newSelectEmp = [...selectEmployees, state[ndx]];
    setSelectEmployees(
      newSelectEmp.sort((a, b) => {
        var nameA = a.fullname.toLowerCase(),
          nameB = b.fullname.toLowerCase();
        if (nameA < nameB)
          //sort string ascending
          return -1;
        if (nameA > nameB) return 1;
        return 0; //default return value (no sorting)
      })
    );

    // setSelectEmployees()
    removeById(id);
  };
  // function handleClick(event) {
  //   setAnchorEl(event.currentTarget);
  // }
  // function handleClose() {
  //   setAnchorEl(null);
  // }
  // let textInput = React.createRef();
  // console.log(Object.entries(state).length > 0);

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
                      id="standard-dense"
                      className={classNames(
                        classes.dayTextField,
                        classes.dense
                      )}
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
                      className={classNames(
                        classes.dayTextField,
                        classes.dense
                      )}
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
                      className={classNames(
                        classes.dayTextField,
                        classes.dense
                      )}
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
                      className={classNames(
                        classes.dayTextField,
                        classes.dense
                      )}
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
                      className={classNames(
                        classes.dayTextField,
                        classes.dense
                      )}
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
                      className={classNames(
                        classes.dayTextField,
                        classes.dense
                      )}
                      margin="dense"
                      inputProps={{
                        maxLength: 2,
                        onKeyUp: onKeyUpAmount,
                        className: classNames(classes.dayTextField)
                      }}
                    />
                  </TableCell>
                  <TableCell className={classes.tdCell}>
                    {row.qtyTotal}
                  </TableCell>
                  <TableCell className={classes.tdCell}>
                    {row.totalAmt}
                  </TableCell>

                  {overtime && otTableRowCol(props, row)}

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
      <TableCell className={classes.tdCell}>{row.otQtyTotal}</TableCell>
      <TableCell className={classes.tdCell}>{row.otTotalAmt}</TableCell>
    </React.Fragment>
  );
}

export default withStyles(stylez, { withTheme: true })(AtzKarlTable);
