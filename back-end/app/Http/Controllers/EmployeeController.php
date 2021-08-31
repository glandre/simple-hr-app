<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

use App\Entity\Employee;
use App\Persistence\EmployeeRepository;

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
        //
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
        Log::debug($employee?->toArray());
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
}
