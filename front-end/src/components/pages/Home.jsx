import React from "react";
import { useEffect } from "react";
import { useGetDepartments } from "../../contexts/api/get-departments";

const Home = () => {
  const { departments, loading, error, getDepartments } = useGetDepartments();

  useEffect(() => {
    getDepartments();
  }, [getDepartments]);

  return (
    <div>
      {loading ? <div>Departments are loading</div> : null}
      {error ? <div>Error fetching departments: {error.message}</div> : null}
      {departments?.length > 0 ? (
        <div>
          <h2>Departments:</h2>
          <ul>
            {departments.map((department) => (
              <li key={department.id}>
                {department.name}: {department.description}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
};

export default Home;
