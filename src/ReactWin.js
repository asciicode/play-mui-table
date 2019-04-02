import React from 'react';
// import ReactDOM from 'react-dom';
import { VariableSizeGrid as Grid } from 'react-window';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';

const styles = theme => ({
  table: {
    fontFamily: theme.typography.fontFamily,
  },
  flexContainer: {
    display: 'flex',
    alignItems: 'center',
    boxSizing: 'border-box',
  },
  tableRow: {
    cursor: 'pointer',
  },
  tableRowHover: {
    '&:hover': {
      backgroundColor: theme.palette.grey[200],
    },
  },
  tableCell: {
    flex: 1,
  },
  noClick: {
    cursor: 'initial',
  },
});
// import './styles.css';

// These cell sizes are arbitrary.
// Yours should be based on the content of the cell.
const columnWidths = new Array(1000)
  .fill(true)
  .map(() => 75 + Math.round(Math.random() * 50));
const rowHeights = new Array(1000)
  .fill(true)
  .map(() => 25 + Math.round(Math.random() * 50));

const Cell = (props) => {
  const { columnIndex, rowIndex, style, classes } = props
  console.log(style)
  return (
    <TableCell
      component="div"
      className={undefined}
      variant="body"
      style={style}
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

const ReactWin = (props) => {
  console.log(props)
  const { classes } = props;
  return (
    <Grid
      className={classNames(classes.table)}
      columnCount={1000}
      columnWidth={index => columnWidths[index]}
      height={500}
      rowCount={1000}
      rowHeight={index => rowHeights[index]}
      width={700}
    >
      {Cell}
    </Grid>
)}

export default withStyles(styles)(ReactWin)
// ReactDOM.render(<Example />, document.getElementById('root'));
