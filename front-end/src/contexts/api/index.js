import { GetDepartmentsProvider } from "./get-departments";
import { GetReportDepartmentHighestSalariesProvider } from "./get-reports-departments-highest-salaries";
import { GetReportDepartmentsWithOverProvider } from "./get-reports-departments-with-over";
import { PostLoginProvider } from "./post-login";
import { PostLogoutProvider } from "./post-logout";

export function ApiProvider({ children }) {
  return (
    <GetDepartmentsProvider>
      <GetReportDepartmentsWithOverProvider>
        <GetReportDepartmentHighestSalariesProvider>
          <PostLoginProvider>
            <PostLogoutProvider>{children}</PostLogoutProvider>
          </PostLoginProvider>
        </GetReportDepartmentHighestSalariesProvider>
      </GetReportDepartmentsWithOverProvider>
    </GetDepartmentsProvider>
  );
}
