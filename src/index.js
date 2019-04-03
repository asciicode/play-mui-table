import React from 'react';
import ReactDOM from 'react-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core'
import { purple, red } from '@material-ui/core/colors'
// import './index.css';
// import ReactVirtualizedTable from './ReactVirtualizedTable'
// import ReactWin from './ReactWin';
import AtzKarlTable from './AtzKarlTable';
// import CssBaseline from '@material-ui/core/CssBaseline';
// <CssBaseline />
const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    // primary: red,
    type: 'dark'
  },
  overrides: {
    MuiTableCell: { // Name of the component ⚛️ / style sheet
      root: {
        // borderBottomColor: 'green'0
        padding: 0
      },
      body: {
        // color: 'white',
      },
    },
  },
})

console.log(theme)
// import * as serviceWorker from './serviceWorker';

// ReactDOM.render(<ReactVirtualizedTable />, document.getElementById('root'));
ReactDOM.render(<MuiThemeProvider theme={theme}><AtzKarlTable /></MuiThemeProvider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
