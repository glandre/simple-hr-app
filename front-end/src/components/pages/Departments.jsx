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
import { useDeleteDepartment } from "../../contexts/api/delete-department";
import { useGetDepartments } from "../../contexts/api/get-departments";
import { usePostDepartments } from "../../contexts/api/post-departments";
import { usePutDepartment } from "../../contexts/api/put-department";
import { getErrorMessage } from "../../utils/error-handling";
import DepartmentsTable from "../organisms/DepartmentsTable";

const Actions = {
  CREATE: "create",
  EDIT: "edit",
};

const DepartmentsPage = () => {
  const [action, setAction] = useState(Actions.CREATE);
  const [id, setId] = useState(null);
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

  const {
    putDepartments,
    loading: putDepartmentsInProgress,
    error: putDepartmentsError,
  } = usePutDepartment();

  const {
    deleteDepartment,
    loading: deleteDepartmentInProgress,
    error: deleteDepartmentError,
  } = useDeleteDepartment();

  const submissionInProgress =
    postDepartmentsInProgress ||
    putDepartmentsInProgress ||
    deleteDepartmentInProgress;

  useEffect(() => {
    if (!submissionInProgress) {
      getDepartments();
      setAction(Actions.CREATE);
      setId(null);
      setName("");
      setDescription("");
    }
  }, [getDepartments, submissionInProgress]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleEdit = (row) => {
    setAction("edit");
    setId(row.id);
    setName(row.name);
    setDescription(row.description);
    scrollToTop();
  };

  const handleDelete = (row) => {
    deleteDepartment(row.id);
    scrollToTop();
  };

  const handleSubmit = () => {
    if (action === Actions.CREATE) {
      postDepartments({ name, description });
    } else if (action === Actions.EDIT) {
      putDepartments(id, { name, description });
    }
  };

  const error =
    getDepartmentsError ||
    postDepartmentsError ||
    putDepartmentsError ||
    deleteDepartmentError;

  const loading =
    departmentsAreLoading ||
    postDepartmentsInProgress ||
    putDepartmentsInProgress ||
    deleteDepartmentInProgress;

  const title = Actions.CREATE ? "Create a department" : `Edit ${name}`;
  const bodyContent = error ? getErrorMessage(error) : "";

  return (
    <Container>
      <Paper elevation={2}>
        <Typography variant="h5" noWrap>
          Manage Departments
        </Typography>
        <Line />
        <Typography variant="h6" noWrap>
          {title}
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

      {departmentsLoaded && (
        <DepartmentsTable
          data={departments}
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

export default DepartmentsPage;
