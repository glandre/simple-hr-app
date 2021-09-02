<?php

namespace App\Persistence\Reports;

use Illuminate\Support\Facades\DB;

/**
 * Report: 
 * Show all departments along with the highest salary within each department.
 * A department with no employees should show 0 as the highest salary.
 */
class HighestSalaryPerDepartment implements Report
{
    public function generate(): array
    {
        $results = DB::select("SELECT
            d.id,
            d.name,
            d.description,
            COALESCE(MAX(e.annual_salary),0) AS highestSalary
        FROM departments d 
        LEFT JOIN employees e on e.department_id = d.id
        GROUP BY d.id;");

        return $results;
    }
}
