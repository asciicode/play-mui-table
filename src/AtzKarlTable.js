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

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
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
    width: 30,
  },
  dense: {
    // marginTop: 19,
  },
});

let id = 0;
function createData(name, calories, fat, carbs, protein) {
  id += 1;
  return { id, name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

function AtzKarlTable(props) {
  const [overtime, setOvertime] = React.useState(true)
  const { classes } = props
  console.log(props, overtime)

  const handleOvertimeToggle = () => {
    setOvertime(!overtime)
  }

  return (
    <Paper className={classes.tableWrap}>
    <div >
      <FormGroup >
        <FormControlLabel
          control={
            <Checkbox checked={overtime} onChange={handleOvertimeToggle} value="" />
          }
          label="Overtime"
        />
      </FormGroup>
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
