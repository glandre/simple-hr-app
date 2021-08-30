import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import FullSpacedContainer from "./components/atoms/FullSizeContainer";
import NavigationItem from "./components/molecules/NavigationItem";
import Page from "./components/molecules/Page";
import PrivateRoute from "./components/molecules/PrivateRoute";
import PublicRoute from "./components/molecules/PublicRoute";
import NavigationBar from "./components/organisms/NavigationBar";
import About from "./components/pages/About";
import HomePage from "./components/pages/Home";
import Landing from "./components/pages/Landing";
import LoginPage from "./components/pages/Login";
import ReactPage from "./components/pages/React";

function App() {
  return (
    <FullSpacedContainer>
      <Router>
        <NavigationBar>
          <NavigationItem private title="Home" path="/home" />
          <NavigationItem title="About" path="/about" />
          <NavigationItem title="React" path="/react" />
        </NavigationBar>
        <Page footerText="App version: 0.0.1">
          <Switch>
            <Route exact path="/about">
              <About />
            </Route>
            <PublicRoute exact path="/login">
              <LoginPage />
            </PublicRoute>
            <Route exact path="/react">
              <ReactPage />
            </Route>
            <PrivateRoute exact path="/home">
              <HomePage />
            </PrivateRoute>
            <Route exact path="/">
              <Landing />
            </Route>
          </Switch>
        </Page>
      </Router>
    </FullSpacedContainer>
  );
}

export default App;
