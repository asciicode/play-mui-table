import { withStyles } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
export const CustomTableCell = withStyles(theme => ({
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
