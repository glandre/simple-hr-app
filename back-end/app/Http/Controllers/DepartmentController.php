<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

use App\Entity\Department;
use App\Persistence\DepartmentRepository;

class DepartmentController extends Controller
{
    private $repository;

    function __construct() {
        $this->repository = new DepartmentRepository();
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $departments = $this->repository->retrieveAll();

        Log::debug("[DepartmentController.index] departments:");
        Log::debug($departments);
        Log::debug('-----------------------');

        return response()->json($departments);
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
        $department = $this->repository->retrieve($id);

        Log::debug("[DepartmentController.show] department:");
        Log::debug($department ? $department->toArray() : null);
        Log::debug('-----------------------');

        return response()->json(['department' => $department]);
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
        Log::debug("[DepartmentController.update] [id=$id] request:");
        Log::debug($request);
        Log::debug('-----------------------');

        $department = new Department();
        $department->fromArray($request);
        $department->id = $id;

        $result = $this->repository->update($department);

        Log::debug("[DepartmentController.update] result:");
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
        Log::debug("[DepartmentController.destroy] [id=$id]");

        $result = $this->repository->delete($id);

        Log::debug("[DepartmentController.destroy] result:");
        Log::debug($result);
        Log::debug('-----------------------');

        return true;
    }
}
