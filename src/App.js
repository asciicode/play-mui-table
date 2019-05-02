import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Home from "./Home";
import Employee from "./Employee";
import AtzKarlTable from "./AtzKarlTable";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Route path="/" exact component={Home} />
        <Route path="/employee" component={Employee} />
        <Route path="/payroll" component={AtzKarlTable} />
      </div>
    </BrowserRouter>
  );
}

export default App;
