import { GetDepartmentsProvider } from "./get-departments";
import { PostLoginProvider } from "./post-login";
import { PostLogoutProvider } from "./post-logout";

export function ApiProvider({ children }) {
  return (
    <GetDepartmentsProvider>
      <PostLoginProvider>
        <PostLogoutProvider>{children}</PostLogoutProvider>
      </PostLoginProvider>
    </GetDepartmentsProvider>
  );
}
