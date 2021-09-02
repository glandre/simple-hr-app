import {
  Button,
  FormControl as MuiFormControl,
  InputLabel,
  LinearProgress,
  MenuItem,
  Paper as MuiPaper,
  Select,
  Typography,
} from "@material-ui/core";
import React from "react";
import styled from "styled-components";
import { useGetReportDepartmentsWithOver } from "../../contexts/api/get-reports-departments-with-over";
import { useGetReportDepartmentHighestSalaries } from "../../contexts/api/get-reports-departments-highest-salaries";
import ExpensiveDepartmentsReportTable from "../organisms/ExpensiveDepartmentsReportTable";
import HighestSalariesReportTable from "../organisms/HighestSalariesReportTable";
import { getErrorMessage } from "../../utils/error-handling";

const numberOfEmployees = 2;
const annualSalary = 50000;

const explanation = {
  "highest-salaries-per-department":
    "This report shows all departments along with the highest salary within each department. A department with no employees shows 0 as the highest salary.",
  "departments-with-over":
    "This report lists just those departments that have more than two employees that earn over 50k.",
};

const ReportsPage = () => {
  const [report, setReport] = React.useState("");
  const [open, setOpen] = React.useState(false);

  const departmentsWithOver = useGetReportDepartmentsWithOver();
  const departmentHighestSalaries = useGetReportDepartmentHighestSalaries();

  const handleSubmitReportDepartmentsWithOver = () => {
    departmentsWithOver.getReportDepartmentsWithOver(
      numberOfEmployees,
      annualSalary
    );
  };

  const handleSubmitReportDepartmentHighestSalaries = () => {
    departmentHighestSalaries.getReportDepartmentHighestSalaries();
  };

  const handleChangeReport = (event) => {
    setReport(event.target.value);
  };

  const handleCloseReport = () => {
    setOpen(false);
  };

  const handleOpenReport = () => {
    setOpen(true);
  };

  const handleSubmit = () => {
    if (report === "departments-with-over") {
      handleSubmitReportDepartmentsWithOver();
    } else if (report === "highest-salaries-per-department") {
      handleSubmitReportDepartmentHighestSalaries();
    }
  };

  const loading =
    departmentsWithOver.loading || departmentHighestSalaries.loading;

  const error = departmentsWithOver.error || departmentHighestSalaries.error;

  const bodyContent = error
    ? getErrorMessage(error)
    : explanation[report] || "Select a report to start.";

  return (
    <Container>
      <Paper elevation={2}>
        <Typography variant="h6" noWrap>
          Reports
        </Typography>
        <FormControl>
          <InputLabel id="report-select-label">Report</InputLabel>
          <Select
            labelId="report-select-label"
            id="report-select"
            open={open}
            onClose={handleCloseReport}
            onOpen={handleOpenReport}
            value={report}
            onChange={handleChangeReport}
          >
            <MenuItem value={"highest-salaries-per-department"}>
              Highest Salaries per Department
            </MenuItem>
            <MenuItem value={"departments-with-over"}>
              Departments with employees that earn over 50k
            </MenuItem>
          </Select>
        </FormControl>
        <DescriptionContainer>
          <Typography variant="body1" noWrap>
            {bodyContent}
          </Typography>
        </DescriptionContainer>
        {Boolean(report) && (
          <Button color="primary" variant="contained" onClick={handleSubmit}>
            Generate report
          </Button>
        )}
      </Paper>

      {loading && <LinearProgress />}

      {report === "departments-with-over" && departmentsWithOver.hasLoaded && (
        <ExpensiveDepartmentsReportTable data={departmentsWithOver.data} />
      )}

      {report === "highest-salaries-per-department" &&
        departmentHighestSalaries.hasLoaded && (
          <HighestSalariesReportTable data={departmentHighestSalaries.data} />
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
  }
`;

const DescriptionContainer = styled.div`
  margin: 20px 0;
`;

export default ReportsPage;
