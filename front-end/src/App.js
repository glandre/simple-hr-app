import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import FullSpacedContainer from "./components/atoms/FullSizeContainer";
import NavigationItem from "./components/molecules/NavigationItem";
import Page from "./components/molecules/Page";
import PrivateRoute from "./components/molecules/PrivateRoute";
import PublicRoute from "./components/molecules/PublicRoute";
import NavigationBar from "./components/organisms/NavigationBar";
import About from "./components/pages/About";
import DepartmentsPage from "./components/pages/Departments";
import EmployeesPage from "./components/pages/Employees";
import HomePage from "./components/pages/Home";
import Landing from "./components/pages/Landing";
import LoginPage from "./components/pages/Login";
import ReportsPage from "./components/pages/Reports";

const drawerWidth = 240;

function App() {
  return (
    <FullSpacedContainer>
      <Router>
        <NavigationBar title="HR App" drawerWidth={drawerWidth}>
          <NavigationItem private title="Home" path="/home" />
          <NavigationItem private title="Departments" path="/departments" />
          <NavigationItem private title="Employees" path="/employees" />
          <NavigationItem title="About" path="/about" />
        </NavigationBar>
        <Page drawerWidth={drawerWidth}>
          <Switch>
            <Route exact path="/about">
              <About />
            </Route>
            <PublicRoute exact path="/login">
              <LoginPage />
            </PublicRoute>
            <PrivateRoute exact path="/home">
              <HomePage />
            </PrivateRoute>
            <PrivateRoute exact path="/departments">
              <DepartmentsPage />
            </PrivateRoute>
            <PrivateRoute exact path="/employees">
              <EmployeesPage />
            </PrivateRoute>
            <PrivateRoute exact path="/reports">
              <ReportsPage />
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
