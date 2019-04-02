import React from 'react';
// import ReactDOM from 'react-dom';
import { VariableSizeGrid as Grid } from 'react-window';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import AutoSizer from "react-virtualized-auto-sizer";
const styles = theme => ({
  table: {
    fontFamily: theme.typography.fontFamily,
  },
  // flexContainer: {
  //   display: 'flex',
  //   alignItems: 'center',
  //   boxSizing: 'border-box',
  // },
  // tableRow: {
  //   cursor: 'pointer',
  // },
  // tableRowHover: {
  //   '&:hover': {
  //     backgroundColor: theme.palette.grey[200],
  //   },
  // },
  tableCell: {

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
  .map(() => 30);
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
  const { columnIndex, rowIndex, style, classes } = props
  console.log(classes)
  const gridClz = columnIndex % 2
    ? rowIndex % 2 === 0
      ? 'GridItemOdd'
      : 'GridItemEven'
    : rowIndex % 2
      ? 'GridItemOdd'
      : 'GridItemEven';
  // console.log(gridClz)
  return (
    <TableCell
      component="div"
      variant="body"
      padding="none"
      align="justify"
      style={{
      ...style,
      top: style.top + GUTTER_SIZE,
      display: 'flex',
      alignItems: 'center'
    }}
    >
      r{rowIndex}, c{columnIndex}
    </TableCell>

  // <div
  //   className={
  //     columnIndex % 2
  //       ? rowIndex % 2 === 0
  //         ? 'GridItemOdd'
  //         : 'GridItemEven'
  //       : rowIndex % 2
  //         ? 'GridItemOdd'
  //         : 'GridItemEven'
  //   }
  //   style={style}
  // >
  //   r{rowIndex}, c{columnIndex}
  // </div>
)}

// const MuiCell = withStyles(styles)(Cell)

const ReactWin = (props) => {
  console.log(props)
  const { classes } = props;
  return (
    <Grid
      className={classNames(classes.table)}
      columnCount={100}
      columnWidth={index => columnWidths[index]}
      height={500}
      rowCount={300}
      rowHeight={index => rowHeights[index]}
      width={700}
    >
      {Cell}
    </Grid>

)}

export default withStyles(styles)(ReactWin)
// ReactDOM.render(<Example />, document.getElementById('root'));
