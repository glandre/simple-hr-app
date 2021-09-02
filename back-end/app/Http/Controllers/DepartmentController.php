<?php

namespace App\Http\Controllers;

use App\Entities\Department;
use App\Persistence\DepartmentRepository;
use App\Persistence\EmployeeRepository;
use Illuminate\Http\Request;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

use function App\Entities\mergeEntities;

class DepartmentController extends Controller
{
    private $repository;
    private $employeeRepository;

    function __construct()
    {
        $this->repository = new DepartmentRepository();
        $this->employeeRepository = new EmployeeRepository();
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $departments = $this->repository->retrieveAll();
        return response()->json($departments);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $department = $this->repository->retrieve($id);
        if (empty($department)) {
            throw new NotFoundHttpException('No records with this ID were found');
        }
        return response()->json(['department' => $department]);
    }

    public function employees($id)
    {
        $employees = $this->employeeRepository->retrieveByDepartmentId($id);
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
        $department = new Department();
        $department->fromObject($request);
        $department->validate();
        $this->repository->create($department);
        $stored = $this->repository->retrieveByName($department->name);
        return response()->json([ 'department' => $stored ]);
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
        $department = $this->repository->retrieve($id);
        return response()->json([ 'department' => $department]);
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
