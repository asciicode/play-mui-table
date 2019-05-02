import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/styles";

const Fragment = React.Fragment;
function App() {
  const theme = useTheme();
  console.log("theme ", theme);

  return (
    <Fragment>
      {/*<CssBaseline />*/}
      {/*<AppBar
                  title="Title"
                  iconClassNameRight="muidocs-icon-navigation-expand-more"/>*/}
      <Typography>Hi there!</Typography>
    </Fragment>
  );
}
export default App;
