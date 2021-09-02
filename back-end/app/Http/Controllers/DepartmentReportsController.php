<?php

namespace App\Http\Controllers;

use App\Persistence\Reports\HighestSalaryPerDepartment;
use App\Persistence\Reports\Report;

class DepartmentReportsController extends Controller
{
    private Report $report;

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
        $result = $this->report->generate();
        return response()->json($result);
    }
}
