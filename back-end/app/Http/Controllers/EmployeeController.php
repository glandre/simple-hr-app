<?php

namespace App\Http\Controllers;

use App\Entities\Employee;
use App\Persistence\EmployeeRepository;
use Illuminate\Http\Request;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

use function App\Entities\mergeEntities;

class EmployeeController extends  Controller
{
    private $repository;

    function __construct()
    {
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
        $employee->validate();
        $this->repository->create($employee);
        $stored = $this->repository->retrieveByEmail($employee->email);
        return response()->json([ 'employee' => $stored ]);
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
        if (empty($employee)) {
            throw new NotFoundHttpException('No records with this ID were found');
        }
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
        $entity = $this->repository->retrieve($id);
        if (empty($entity)) {
            throw new NotFoundHttpException('No records with this ID were found');
        }
        $updated = mergeEntities($entity, $request);
        $updated->validate();
        $this->repository->update($updated);
        $employee = $this->repository->retrieve($id);
        return response()->json([ 'employee' => $employee]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $deleted = $this->repository->retrieve($id);
        $success = $this->repository->delete($id);
        return $success 
            ? response()->json([ 'success' => true, 'deleted' => $deleted ])
            : response()->json([ 'success' => false]);
    }
}
