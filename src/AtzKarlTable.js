import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Icon from '@material-ui/core/Icon';
import red from '@material-ui/core/colors/red';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import classNames from 'classnames';
import InputBase from '@material-ui/core/InputBase';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  root: {
    paddingLeft: 5,
  },
}))(TableCell);

const styles = theme => ({
  tableWrap: {
    // display: 'flex',
    borderRadius: 4,
    justifyCenter: 'center',
    backgroundColor: theme.palette.background.paper,
    padding: 24
  },
  root: {
    width: '100%',
    // marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',

  },
  table: {
    minWidth: 700,
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
  iconHover: {
    margin: theme.spacing.unit * 2,
    '&:hover': {
      color: red[800],
    },
  },
  overtimeBox: {
    border: '2px solid white'
  },
  textField: {
    // marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 30
  },
  InputProps: {
    textAlign: 'center'
  },
  dense: {
    // marginTop: 19,
  },
  bootstrapRoot: {
    'label + &': {
      marginTop: theme.spacing.unit * 3,
    },
  },
  bootstrapInput: {
    textAlign: 'center'
  },
  divTableTop: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  openMenu: {
    textTransform: 'none'
  },
  button: {
    margin: theme.spacing.unit,
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  iconSmall: {
    fontSize: 20,
  },
});

let id = 0;
function createData(name, calories, fat, carbs, protein) {
  id += 1;
  return { id, name, calories, fat, carbs, protein };
}

const rows = [
  createData('Juan', 159, 6.0, 24, 4.0),
  createData('Pedro', 237, 9.0, 37, 4.3),
  createData('Socrates', 262, 16.0, 24, 6.0),
  createData('Ascii', 305, 3.7, 67, 4.3),
  createData('Goryo', 356, 16.0, 49, 3.9),
];

function AtzKarlTable(props) {
  const [overtime, setOvertime] = React.useState(false)
  const [anchorEl, setAnchorEl] = React.useState(null);

  const { classes } = props
  console.log(props, overtime)

  const handleOvertimeToggle = () => {
    setOvertime(!overtime)
  }
  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }
  return (
    <Paper className={classes.tableWrap}>
    <div className={classes.divTableTop}>
      <FormGroup >
        <FormControlLabel
          control={
            <Checkbox checked={overtime} onChange={handleOvertimeToggle} value="" color="primary"/>
          }
          label="Overtime"
        />
      </FormGroup>
      <div  style={{display:'flex',flexDirection:'row',maxWidth:500}}>
        <Button variant="contained" color="primary" size="small" className={classes.button}>
          Add New Employee
          {/* This Button uses a Font Icon, see the installation instructions in the docs. */}
          <Icon className={classes.rightIcon}>person_add</Icon>
        </Button>
        <Button variant="contained" color="primary" size="small" className={classes.button}>
          Add Employee To Payroll
          {/* This Button uses a Font Icon, see the installation instructions in the docs. */}
          <Icon className={classes.rightIcon}>group_add</Icon>
        </Button>

      </div>
      {/*<Button
        aria-owns={anchorEl ? 'simple-menu' : undefined}
        aria-haspopup="true"
        onClick={handleClick} className={classes.openMenu}
      >
        Actions
      </Button>
      <Menu id="simple-menu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={handleClose}>Add New Employee</MenuItem>
        <MenuItem onClick={handleClose}>Add Employee to this Payroll</MenuItem>
        <MenuItem onClick={handleClose}>Add Employee to this Payrollz</MenuItem>
      </Menu>*/}

    </div>
    <Paper className={classes.root}>
      <Table className={classes.table}>
      { overtime &&
        <>
        <TableHead>
        <TableRow>
          <CustomTableCell colSpan={2} className={classes.overtimeBox}></CustomTableCell>
          <CustomTableCell colSpan={8} align="center" className={classes.overtimeBox}>Ordinary</CustomTableCell>
          <CustomTableCell colSpan={8} align="center" className={classes.overtimeBox}>Overtime</CustomTableCell>
          <CustomTableCell colSpan={3} className={classes.overtimeBox}></CustomTableCell>
        </TableRow>
        </TableHead>
        </>
      }
      <TableHead>
        <TableRow>
          <CustomTableCell>Employee</CustomTableCell>
          <CustomTableCell >Worker Description</CustomTableCell>

          <CustomTableCell >Rate</CustomTableCell>
          <CustomTableCell >M</CustomTableCell>
          <CustomTableCell >T</CustomTableCell>
          <CustomTableCell >W</CustomTableCell>
          <CustomTableCell >Th</CustomTableCell>
          <CustomTableCell >F</CustomTableCell>
          <CustomTableCell >No. of Hrs</CustomTableCell>
          <CustomTableCell >Total Amt</CustomTableCell>
          { overtime &&
              <>
              <CustomTableCell >Rate</CustomTableCell>
              <CustomTableCell >M</CustomTableCell>
              <CustomTableCell >T</CustomTableCell>
              <CustomTableCell >W</CustomTableCell>
              <CustomTableCell >Th</CustomTableCell>
              <CustomTableCell >F</CustomTableCell>
              <CustomTableCell >No. of Hrs</CustomTableCell>
              <CustomTableCell >Total Amt</CustomTableCell>
              </>
          }

          <CustomTableCell >Net Earnings</CustomTableCell>
          <CustomTableCell >SSS</CustomTableCell>
          <CustomTableCell >PhilHealth</CustomTableCell>
        </TableRow>
      </TableHead>


        <TableBody>
          {rows.map(row => (
            <TableRow className={classes.row} key={row.id}>
              <CustomTableCell component="td" scope="row">
                {row.name}
              </CustomTableCell>
              <CustomTableCell >{row.calories}</CustomTableCell>
              <CustomTableCell >{row.protein}</CustomTableCell>
              <CustomTableCell >
              <TextField
                id="standard-dense"
                className={classNames(classes.textField, classes.dense)}
                margin="dense"
                inputProps={{step: 300,}}
              />
              </CustomTableCell>
              <CustomTableCell >
              <TextField
                id="standard-dense"
                className={classNames(classes.textField, classes.dense)}
                margin="dense"
              />
              </CustomTableCell>
              <CustomTableCell >
              <TextField
                id="standard-dense"
                className={classNames(classes.textField, classes.dense)}
                margin="dense"
              />
              </CustomTableCell>
              <CustomTableCell >
              <TextField
                id="standard-dense"
                className={classNames(classes.textField, classes.dense)}
                margin="dense"
              />
              </CustomTableCell>
              <CustomTableCell >
              <TextField
                id="standard-dense"
                className={classNames(classes.textField, classes.dense)}
                margin="dense"
              />
              </CustomTableCell>
              <CustomTableCell >{row.carbs}</CustomTableCell>
              <CustomTableCell >{row.carbs}</CustomTableCell>

              { overtime && <>
                <CustomTableCell >{row.protein}</CustomTableCell>
                <CustomTableCell >
                <TextField
                  id="standard-dense"
                  className={classNames(classes.textField, classes.dense)}
                  margin="dense"
                />
                </CustomTableCell>
                <CustomTableCell >
                <TextField
                  id="standard-dense"
                  className={classNames(classes.textField, classes.dense)}
                  margin="dense"
                />
                </CustomTableCell>
                <CustomTableCell >
                <TextField
                  id="standard-dense"
                  className={classNames(classes.textField, classes.dense)}
                  margin="dense"
                />
                </CustomTableCell>
                <CustomTableCell >
                <TextField
                  id="standard-dense"
                  className={classNames(classes.textField, classes.dense)}
                  margin="dense"
                />
                </CustomTableCell>
                <CustomTableCell >
                <TextField
                  id="standard-dense"
                  className={classNames(classes.textField, classes.dense)}
                  margin="dense"
                />
                </CustomTableCell>
                <CustomTableCell >{row.carbs}</CustomTableCell>
                <CustomTableCell >{row.protein}</CustomTableCell>
                </>
              }

              <CustomTableCell >{row.carbs}</CustomTableCell>
              <CustomTableCell >{row.carbs}</CustomTableCell>
              <CustomTableCell >{row.carbs}</CustomTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
    </Paper>
  );
}

AtzKarlTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AtzKarlTable);
