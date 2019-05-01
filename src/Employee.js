import React from "react";
import { CustomTableCell } from "./CustomTableCell";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { useEmployees } from "./hooks/useEmployees";
import classNames from "classnames";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import {
  Fab,
  Dialog as MuiDialog,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "@material-ui/core";
import EmployeeDialog from "./EmployeeDialog";
import { Add } from "@material-ui/icons";
import { employeeRowEmpty } from "./data/payroll";

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

function Employee(props) {
  const { classes } = props;
  console.log("Employee render");
  const [employee, setEmployee] = React.useState(employeeRowEmpty);
  const [open, setOpen] = React.useState(false);
  const handleToggle = () => {
    setOpen(!open);
    console.log("handleToggle ", !open);
    if (!open) {
      setEmployee(employeeRowEmpty);
    }
  };
  const [
    state,
    addEmployee,
    deleteEmployee,
    editEmployee,
    listEmployee
  ] = useEmployees();

  const handleSubmit = form => {
    console.log("handleSubmit form ", form);
    handleToggle();
    if (employee && employee.employeeId) {
      editEmployee(form);
    } else {
      addEmployee(form);
    }
  };
  const handleEditClick = id => {
    console.log("handleEditClick form ", id);
    handleToggle();
    setEmployee(state.find(rec => rec.employeeId === id));
  };
  const handleDeleteClick = id => {
    console.log("handleDeleteClick form ", id);
    deleteEmployee(id);
  };
  return (
    <Paper className={classes.tableWrap}>
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <CustomTableCell>
                Lastname
                <div style={{ display: "inline-block" }}>
                  <Fab color="secondary" size="small" onClick={handleToggle}>
                    <Add />
                  </Fab>
                  <EmployeeDialog
                    onSubmit={handleSubmit}
                    open={open}
                    onToggle={handleToggle}
                    data={employee}
                  />
                </div>
              </CustomTableCell>
              <CustomTableCell>Firstname</CustomTableCell>

              <CustomTableCell>Job Description</CustomTableCell>
              <CustomTableCell>Rate</CustomTableCell>
              <CustomTableCell>OT multiplier</CustomTableCell>
              <CustomTableCell>SSS</CustomTableCell>
              <CustomTableCell>PhilHealth</CustomTableCell>
              <CustomTableCell style={{ width: "1%" }} />
              <CustomTableCell style={{ width: "1%" }} />
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
                    {row.lastname}
                  </TableCell>
                  <TableCell>{row.firstname}</TableCell>
                  <TableCell>{row.jobDescription}</TableCell>
                  <TableCell className={classes.tdCell}>{row.rate}</TableCell>
                  <TableCell className={classes.tdCell}>
                    {row.otMultiplier}
                  </TableCell>
                  <TableCell className={classes.tdCell}>{row.sss}</TableCell>
                  <TableCell className={classes.tdCell}>
                    {row.philHealth}
                  </TableCell>
                  <TableCell align="center">
                    <IconButton
                      className={classes.button}
                      aria-label="Delete"
                      onClick={() => handleEditClick(row.employeeId)}
                    >
                      <EditIcon />
                    </IconButton>
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

export default withStyles(stylez, { useTheme: true })(Employee);
