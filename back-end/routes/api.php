<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DepartmentController;
use App\Http\Controllers\DepartmentReportsController;
use App\Http\Controllers\EmployeeController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::apiResources([
    'departments' => DepartmentController::class,
    'employees' => EmployeeController::class
]);

Route::get('departments/{id}/employees', [DepartmentController::class, 'employees']);

Route::get('reports/departments/highest-salaries', [DepartmentReportsController::class, 'highestSalaries']);
Route::get('reports/departments/with/{numEmployees}/over/{salary}', [DepartmentReportsController::class, 'withEmployeeSalariesOver']);
