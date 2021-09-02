<?php

namespace App\Persistence\Reports;

use Illuminate\Support\Facades\DB;

/**
 * Report: 
 * List just those departments that have more than two employees that earn over 50k.
 */
class DepartmentsWithXEmployeesOverYSalary implements Report
{
    private int $numEmployees;
    private float $salary;

    public function __construct(int $numEmployees, float $salary)
    {
        $this->numEmployees = $numEmployees;
        $this->salary = $salary;
    }

    public function generate(): array
    {
        $results = DB::select("SELECT 
                departments.id,
                departments.name,
                partial_data.number_of_employees  as numberOfEmployees
            FROM departments
            JOIN (
                SELECT d.id, COUNT(d.id) AS number_of_employees
                FROM departments d 
                LEFT JOIN employees e on e.department_id = d.id 
                WHERE e.annual_salary > ?
                GROUP BY d.id
            ) AS partial_data ON partial_data.id = departments.id
            WHERE partial_data.number_of_employees > ?;", [$this->salary, $this->numEmployees]);

        return $results;
    }
}
