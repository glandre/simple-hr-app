<?php

namespace Database\Seeders;

use App\Entities\Employee;
use App\Persistence\DepartmentRepository;
use App\Persistence\EmployeeRepository;
use Faker\Generator as Faker;
use Illuminate\Database\Seeder;

class EmployeesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run(Faker $faker)
    {
        $employeeRepository = new EmployeeRepository();
        $depatmentRepository = new DepartmentRepository();

        // Let's truncate our existing records to start from scratch.
        $employeeRepository->deleteAll();

        $departments = $depatmentRepository->retrieveAll();

        foreach($departments as $department) {
            for ($i = 0; $i < 10; $i++) {
                $employeeRepository->create(generateFakeEmployee($department->id, $faker));
            }
        }
    }
}

function generateFakeEmployee(int $departmentId, Faker $faker): Employee {
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