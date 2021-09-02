<?php

namespace App\Http\Controllers;

use App\Persistence\Reports\DepartmentsWithXEmployeesOverYSalary;
use App\Persistence\Reports\HighestSalaryPerDepartment;

class DepartmentReportsController extends Controller
{
    function __construct()
    {
        $this->report = new HighestSalaryPerDepartment();
    }

    /**
     * Shows all departments along with the highest salary within each department.
     *
     * @return \Illuminate\Http\Response
     */
    public function highestSalaries()
    {
        $report = new HighestSalaryPerDepartment();
        $result = $report->generate();
        return response()->json($result);
    }

    /**
     * List just those departments that have more than two employees that earn over 50k.
     */
    public function withEmployeeSalariesOver($numEmployees, $salary)
    {
        $report = new DepartmentsWithXEmployeesOverYSalary($numEmployees, $salary);
        $result = $report->generate();
        return response()->json($result);
    }
}
