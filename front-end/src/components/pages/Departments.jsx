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
import { useGetDepartments } from "../../contexts/api/get-departments";
import { usePostDepartments } from "../../contexts/api/post-departments";
import DepartmentsTable from "../organisms/DepartmentsTable";

const DepartmentsPage = () => {
  const [action, setAction] = useState("Create a department");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const {
    getDepartments,
    loading: departmentsAreLoading,
    hasLoaded: departmentsLoaded,
    departments,
    error: getDepartmentsError,
  } = useGetDepartments();

  const {
    postDepartments,
    loading: postDepartmentsInProgress,
    error: postDepartmentsError,
  } = usePostDepartments();

  const submissionInProgress = postDepartmentsInProgress;

  useEffect(() => {
    if (!submissionInProgress) {
      getDepartments();
    }
  }, [getDepartments, submissionInProgress]);

  const handleSubmit = () => {
    postDepartments({ name, description });
  };

  const error = getDepartmentsError || postDepartmentsError;

  const loading = departmentsAreLoading || postDepartmentsInProgress;
  const bodyContent = error ? error.message : "";

  return (
    <Container>
      <Paper elevation={2}>
        <Typography variant="h5" noWrap>
          Manage Departments
        </Typography>
        <Line />
        <Typography variant="h6" noWrap>
          {action}
        </Typography>
        <Padding />
        <FormControl>
          <TextField
            placeholder="Name"
            labelId="department-name"
            id="report-select"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </FormControl>
        <FormControl>
          <TextField
            multiline
            placeholder="Description"
            labelId="department-description"
            id="report-select"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
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

      {departmentsLoaded && <DepartmentsTable data={departments} />}
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

export default DepartmentsPage;
