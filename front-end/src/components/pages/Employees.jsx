import {
  Button,
  FormControl as MuiFormControl,
  LinearProgress,
  Paper as MuiPaper,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import { useDeleteEmployee } from "../../contexts/api/delete-employee";
import { useGetEmployees } from "../../contexts/api/get-employees";
import { usePostEmployees } from "../../contexts/api/post-employees";
import { usePutEmployee } from "../../contexts/api/put-employee";
import { getErrorMessage } from "../../utils/error-handling";
import EmployeesTable from "../organisms/EmployeesTable";

const Actions = {
  CREATE: "create",
  EDIT: "edit",
};

const EmployeesPage = () => {
  const [action, setAction] = useState(Actions.CREATE);
  const [id, setId] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [departmentId, setDepartmentId] = useState("");
  const [annualSalary, setAnnualSalary] = useState("");

  const {
    getEmployees,
    loading: employeesAreLoading,
    hasLoaded: employeesLoaded,
    employees,
    error: getEmployeesError,
  } = useGetEmployees();

  const {
    postEmployees,
    loading: postEmployeesInProgress,
    error: postEmployeesError,
  } = usePostEmployees();

  const {
    putEmployees,
    loading: putEmployeesInProgress,
    error: putEmployeesError,
  } = usePutEmployee();

  const {
    deleteEmployee,
    loading: deleteEmployeeInProgress,
    error: deleteEmployeeError,
  } = useDeleteEmployee();

  const submissionInProgress =
    postEmployeesInProgress ||
    putEmployeesInProgress ||
    deleteEmployeeInProgress;

  useEffect(() => {
    if (!submissionInProgress) {
      getEmployees();
      setAction(Actions.CREATE);
      setId(null);
      setFirstName("");
      setLastName("");
      setEmail("");
      setDepartmentId("");
      setAnnualSalary("");
    }
  }, [getEmployees, submissionInProgress]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleEdit = (row) => {
    setAction("edit");
    setId(row.id);
    setFirstName(row.firstName);
    setLastName(row.lastName);
    setEmail(row.email);
    setDepartmentId(row.departmentId);
    setAnnualSalary(row.annualSalary);
    scrollToTop();
  };

  const handleDelete = (row) => {
    deleteEmployee(row.id);
    scrollToTop();
  };

  const handleSubmit = () => {
    if (action === Actions.CREATE) {
      postEmployees({ firstName, lastName, email, departmentId, annualSalary });
    } else if (action === Actions.EDIT) {
      putEmployees(id, {
        firstName,
        lastName,
        email,
        departmentId,
        annualSalary,
      });
    }
  };

  const error =
    getEmployeesError ||
    postEmployeesError ||
    putEmployeesError ||
    deleteEmployeeError;

  const loading =
    employeesAreLoading ||
    postEmployeesInProgress ||
    putEmployeesInProgress ||
    deleteEmployeeInProgress;

  const title = Actions.CREATE ? "Create a employee" : `Edit ${firstName}`;
  const bodyContent = error ? getErrorMessage(error) : "";

  return (
    <Container>
      <Paper elevation={2}>
        <Typography variant="h5" noWrap>
          Manage Employees
        </Typography>
        <Line />
        <Typography variant="h6" noWrap>
          {title}
        </Typography>
        <Padding />
        <FormControl>
          <TextField
            placeholder="First Name"
            id="employee-first-name"
            value={firstName}
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
          />
        </FormControl>
        <FormControl>
          <TextField
            placeholder="Last Name"
            id="employee-last-name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <TextField
            placeholder="Email"
            id="employee-email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <TextField
            placeholder="Department"
            id="employee-department"
            value={departmentId}
            onChange={(e) => setDepartmentId(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <TextField
            placeholder="Salary"
            id="employee-salary"
            value={annualSalary}
            onChange={(e) => setAnnualSalary(e.target.value)}
          />
        </FormControl>
        <DescriptionContainer>
          <Typography variant="body1" noWrap>
            {bodyContent}
          </Typography>
        </DescriptionContainer>

        <Button
          color="primary"
          variant="contained"
          onClick={handleSubmit}
          disabled={submissionInProgress}
        >
          Save
        </Button>
      </Paper>

      {loading && <LinearProgress />}

      {employeesLoaded && (
        <EmployeesTable
          data={employees}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </Container>
  );
};

const Container = styled.div``;

const Paper = styled(MuiPaper)`
  padding: 20px;
  margin: 20px 0 30px;
`;

const FormControl = styled(MuiFormControl)`
  && {
    min-width: 240px;
    margin: 0 10px;
  }
`;

const DescriptionContainer = styled.div`
  margin: 20px 0;
`;

const Line = styled.hr`
  margin: 20px 0 40px;
`;

const Padding = styled.div`
  padding: 20px 0 0;
`;

export default EmployeesPage;
