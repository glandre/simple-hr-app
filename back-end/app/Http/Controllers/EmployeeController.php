<?php

namespace App\Http\Controllers;

use App\Entities\Employee;
use App\Persistence\EmployeeRepository;
use Faker\Generator as Faker;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class EmployeeController extends  Controller
{
    private $repository;

    function __construct() {
        $this->repository = new EmployeeRepository();
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $employees = $this->repository->retrieveAll();

        Log::debug("[EmployeeController.index] employees:");
        Log::debug($employees);
        Log::debug('-----------------------');

        return response()->json($employees);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $employee = new Employee();
        $employee->fromObject($request);

        Log::debug("[EmployeeController.store] request:");
        Log::debug($request);
        Log::debug('-----------------------');
        Log::debug("[EmployeeController.show] employee:");
        Log::debug($employee ? $employee->toArray() : null);
        Log::debug('-----------------------');

        $employee->validate();

        $employeeRepository = new EmployeeRepository();
        $employeeRepository->create($employee);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $employee = $this->repository->retrieve($id);

        Log::debug("[EmployeeController.show] employee:");
        Log::debug($employee ? $employee->toArray() : null);
        Log::debug('-----------------------');

        return response()->json([ 'employee' => $employee]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        Log::debug("[EmployeeController.update] [id=$id] request:");
        Log::debug($request);
        Log::debug('-----------------------');

        $employee = new Employee();
        $employee->fromArray($request);
        $employee->id = $id;

        $result = $this->repository->update($employee);

        Log::debug("[EmployeeController.update] result:");
        Log::debug($result);
        Log::debug('-----------------------');

        return true;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        Log::debug("[EmployeeController.destroy] [id=$id]");

        $result = $this->repository->delete($id);

        Log::debug("[EmployeeController.destroy] result:");
        Log::debug($result);
        Log::debug('-----------------------');

        return true;
    }

    private function generateFakeEmployee(int $departmentId, Faker $faker): Employee {
        $email = $faker->email;
        $fullName = $faker->name;
        $parts = explode(' ', $fullName);
        $lastName = end($parts);
        $firstName = str_replace($lastName,'',$fullName);
    
        $employee = new Employee();
        $employee->email = $email;
        $employee->firstName = $firstName;
        $employee->lastName = $lastName;
        $employee->departmentId = $departmentId;
    
        return $employee;
    }
}
