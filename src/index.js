import React from "react";
import ReactDOM from "react-dom";
// import { MuiThemeProvider } from "@material-ui/core";
import { MuiThemeProvider } from "@material-ui/core/styles";
// import { purple, red } from '@material-ui/core/colors'
// import './index.css';
// import ReactVirtualizedTable from './ReactVirtualizedTable'
// import ReactWin from './ReactWin';
import AtzKarlTable from "./AtzKarlTable";
// import EmployeeDialog from "./EmployeeDialog";
// import SearchAddEmployees from "./SearchAddEmployees";
import CssBaseline from "@material-ui/core/CssBaseline";
import TodoList from "./Experimental/TodoList";
import Employee from "./Employee";
import Home from "./Home";
import App from "./App";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
// import { generatePayrollRows } from "./data/payroll";

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
    fontSize: 12
  },
  palette: {
    // primary: red,
    type: "dark"
  },
  overrides: {
    MuiTableCell: {
      // Name of the component ⚛️ / style sheet
      root: {
        // borderBottomColor: 'green'0
        padding: 0,
        "&:last-child": {
          paddingRight: 0
        }
      },
      body: {
        // color: 'white',
        fontSize: 12
      }
    },
    MuiInputBase: {},
    MuiFab: {
      root: {
        marginLeft: 8,
        marginRight: 8
      }
    },
    MuiPaper: {},
    MuiTypography: {}
  }
});

// export const AppContext = React.createContext();
// console.log(theme);
// import * as serviceWorker from './serviceWorker';

// ReactDOM.render(<ReactVirtualizedTable />, document.getElementById('root'));
// ReactDOM.render(
// 	<MuiThemeProvider theme={theme}>
// 		<SearchAddEmployees />
// 	</MuiThemeProvider>,
// 	document.getElementById('root')
// );
// ReactDOM.render(
// 	<MuiThemeProvider theme={theme}>
// 		<EmployeeDialog />
// 	</MuiThemeProvider>,
// 	document.getElementById('root')
// );
// ReactDOM.render(<TodoList />, document.getElementById("root"));
ReactDOM.render(
  <ThemeProvider theme={theme}>
    <MuiThemeProvider theme={theme}>
      <App />
    </MuiThemeProvider>
  </ThemeProvider>,
  document.getElementById("root")
);
// theme provider not working for background color
// ReactDOM.render(
//   <ThemeProvider theme={theme}>
//     <CssBaseline />
//     <HiThere />
//   </ThemeProvider>,
//   document.getElementById("root")
// );
// ReactDOM.render(
//   <MuiThemeProvider theme={theme}>
//     <AtzKarlTable />
//   </MuiThemeProvider>,
//   document.getElementById("root")
// );
// ReactDOM.render(
//   <MuiThemeProvider theme={theme}>
//     <Employee />
//   </MuiThemeProvider>,
//   document.getElementById("root")
// );

// If you want your app to work offline and load faster, you can ReactDOM.render(<MuiThemeProvider theme={theme}><EmployeeDialog /></MuiThemeProvider>, document.getElementById('root'));
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
