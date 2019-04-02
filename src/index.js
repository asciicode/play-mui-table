import React from 'react';
import ReactDOM from 'react-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core'
import { purple } from '@material-ui/core/colors'
// import './index.css';
import ReactVirtualizedTable from './ReactVirtualizedTable'
import ReactWin from './ReactWin';

const theme = createMuiTheme({
  palette: {
    primary: purple,
    // type: 'dark'
  }
})

console.log(theme)
// import * as serviceWorker from './serviceWorker';

// ReactDOM.render(<ReactVirtualizedTable />, document.getElementById('root'));
ReactDOM.render(<MuiThemeProvider theme={theme}><ReactWin /></MuiThemeProvider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
