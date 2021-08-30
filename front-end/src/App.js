import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import About from "./components/pages/About";
import HomePage from "./components/pages/Home";
import Landing from "./components/pages/Landing";
import LoginPage from "./components/pages/Login";
import ReactPage from "./components/pages/React";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/login">
          <LoginPage />
        </Route>
        <Route path="/react">
          <ReactPage />
        </Route>
        <Route path="/home">
          <HomePage />
        </Route>
        <Route path="/">
          <Landing />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
