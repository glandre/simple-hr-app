import { DeleteDepartmentProvider } from "./delete-department";
import { GetDepartmentsProvider } from "./get-departments";
import { GetReportDepartmentHighestSalariesProvider } from "./get-reports-departments-highest-salaries";
import { GetReportDepartmentsWithOverProvider } from "./get-reports-departments-with-over";
import { PostDepartmentsProvider } from "./post-departments";
import { PostLoginProvider } from "./post-login";
import { PostLogoutProvider } from "./post-logout";
import { PutDepartmentProvider } from "./put-department";

export function ApiProvider({ children }) {
  return (
    <GetDepartmentsProvider>
      <GetReportDepartmentsWithOverProvider>
        <GetReportDepartmentHighestSalariesProvider>
          <PostDepartmentsProvider>
            <PutDepartmentProvider>
              <DeleteDepartmentProvider>
                <PostLoginProvider>
                  <PostLogoutProvider>{children}</PostLogoutProvider>
                </PostLoginProvider>
              </DeleteDepartmentProvider>
            </PutDepartmentProvider>
          </PostDepartmentsProvider>
        </GetReportDepartmentHighestSalariesProvider>
      </GetReportDepartmentsWithOverProvider>
    </GetDepartmentsProvider>
  );
}
