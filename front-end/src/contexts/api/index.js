import { GetDepartmentsProvider } from "./get-departments";

export function ApiProvider({ children }) {
  return <GetDepartmentsProvider>{children}</GetDepartmentsProvider>;
}
