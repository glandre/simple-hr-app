import { DeleteDepartmentProvider } from "./delete-department";
import { DeleteEmployeeProvider } from "./delete-employee";
import { GetDepartmentsProvider } from "./get-departments";
import { GetEmployeesProvider } from "./get-employees";
import { GetReportDepartmentHighestSalariesProvider } from "./get-reports-departments-highest-salaries";
import { GetReportDepartmentsWithOverProvider } from "./get-reports-departments-with-over";
import { PostDepartmentsProvider } from "./post-departments";
import { PostEmployeesProvider } from "./post-employees";
import { PostLoginProvider } from "./post-login";
import { PostLogoutProvider } from "./post-logout";
import { PutDepartmentProvider } from "./put-department";
import { PutEmployeeProvider } from "./put-employee";

export function ApiProvider({ children }) {
  return (
    <GetReportDepartmentsWithOverProvider>
      <GetReportDepartmentHighestSalariesProvider>
        <GetEmployeesProvider>
          <PostEmployeesProvider>
            <PutEmployeeProvider>
              <DeleteEmployeeProvider>
                <GetDepartmentsProvider>
                  <PostDepartmentsProvider>
                    <PutDepartmentProvider>
                      <DeleteDepartmentProvider>
                        <PostLoginProvider>
                          <PostLogoutProvider>{children}</PostLogoutProvider>
                        </PostLoginProvider>
                      </DeleteDepartmentProvider>
                    </PutDepartmentProvider>
                  </PostDepartmentsProvider>
                </GetDepartmentsProvider>
              </DeleteEmployeeProvider>
            </PutEmployeeProvider>
          </PostEmployeesProvider>
        </GetEmployeesProvider>
      </GetReportDepartmentHighestSalariesProvider>
    </GetReportDepartmentsWithOverProvider>
  );
}
