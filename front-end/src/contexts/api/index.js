import { GetDepartmentsProvider } from "./get-departments";
import { GetReportDepartmentHighestSalariesProvider } from "./get-reports-departments-highest-salaries";
import { GetReportDepartmentsWithOverProvider } from "./get-reports-departments-with-over";
import { PostDepartmentsProvider } from "./post-departments";
import { PostLoginProvider } from "./post-login";
import { PostLogoutProvider } from "./post-logout";

export function ApiProvider({ children }) {
  return (
    <GetDepartmentsProvider>
      <GetReportDepartmentsWithOverProvider>
        <GetReportDepartmentHighestSalariesProvider>
          <PostDepartmentsProvider>
            <PostLoginProvider>
              <PostLogoutProvider>{children}</PostLogoutProvider>
            </PostLoginProvider>
          </PostDepartmentsProvider>
        </GetReportDepartmentHighestSalariesProvider>
      </GetReportDepartmentsWithOverProvider>
    </GetDepartmentsProvider>
  );
}
