import React from 'react';
// import ReactDOM from 'react-dom';
import { VariableSizeGrid as Grid } from 'react-window';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import AutoSizer from "react-virtualized-auto-sizer";
import Paper from '@material-ui/core/Paper';
const styles = theme => ({
//   .Grid {
//   border: 1px solid #d9dddd;
// }
  root: {
    // width: '100%',
    // marginTop: theme.spacing.unit * 3,
    // overflowX: 'auto',
  },
  reactWindowWrap: {
    padding: '20 20 20 20'
  },
  table: {
    fontFamily: theme.typography.fontFamily,
    // border: '1px solid #d9dddd',
  },
  flexContainer: {
    display: 'flex',
    alignItems: 'center',
    // backgroundColor: theme.palette.common.black,
    color: theme.palette.common.black,
    // padding: 2,
    // color: 'green'
    // backgroundColor: theme.palette.secondary.dark
  },
  // tableRow: {
  //   cursor: 'pointer',
  // },
  // tableRowHover: {
  //   '&:hover': {
  //     backgroundColor: theme.palette.grey[200],
  //   },
  // },
  tableCell: {
    // '&:nth-of-type(odd)': {
    //   backgroundColor: theme.palette.background.default,
    // },
  },
  GridHeader: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  GridItemOdd: {
    backgroundColor: '#303030',
    color: theme.palette.common.white,
  },
  GridItemEven: {
    backgroundColor: '#424242',
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 12,
  // noClick: {
  //   cursor: 'initial',
  },
});
// import './styles.css';
// display: flex;
// These cell sizes are arbitrary.
// Yours should be based on the content of the cell.
const columnWidths = new Array(100)
  .fill(true)
  .map(() => 75);
const rowHeights = new Array(100)
  .fill(true)
  .map(() => 50);
const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  body: {
    fontSize: 14,
    // fontFamily: theme.typography.fontFamily,
  }
}))(TableCell);
const GUTTER_SIZE = 10;
function Cell(props){
  const { columnIndex, rowIndex, style, classes, className } = props
  // console.log(props)
  const gridClz = rowIndex % 2 === 0
      ? 'GridItemOdd'
      : 'GridItemEven'
  console.log(gridClz)
  return (
    <TableCell
      className={classNames(classes.tableCell, classes.flexContainer, classes.tableCell,
        rowIndex === 0 ? classes.GridHeader : (rowIndex % 2 === 0 ? classes.GridItemEven : classes.GridItemOdd))}
      component="div"
      variant="body"
      style={{
      ...style,
      top: style.top + GUTTER_SIZE
    }}
    >
      r{rowIndex}, c{columnIndex}
    </TableCell>

)}

const MuiCell = withStyles(styles)(Cell)

const ReactWin = (props) => {
    console.log(props)
  const { classes } = props;
  return (
    // <AutoSizer>
    // {({ height, width }) => {
    //   console.log(height)
    //   return (
    // <Paper className={classNames(classes.root, classes.reactWindowWrap)}>
    <Grid
      className={classNames(classes.table)}
      columnCount={100}
      columnWidth={index => columnWidths[index]}
      height={500}
      rowCount={300}
      rowHeight={index => rowHeights[index]}
      width={500}
    >
      {MuiCell}
    </Grid>
    // </Paper>
  // )}}
  //   </AutoSizer>
)}

export default withStyles(styles)(ReactWin)
// ReactDOM.render(<Example />, document.getElementById('root'));
