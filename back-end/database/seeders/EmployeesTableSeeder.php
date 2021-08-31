<?php

namespace Database\Seeders;

use Faker\Generator as Faker;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

use App\Persistence\EmployeeRepository;

class EmployeesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run(Faker $faker)
    {
        $repository = new EmployeeRepository();

        // Let's truncate our existing records to start from scratch.
        $repository->deleteAll();

        // And now, let's create a few articles in our database:
        foreach ($fakeEmployees as $employee) {
            // DB::statement(
            //     'INSERT INTO `employees` (`name`, `description`, `created_at`, `updated_at`) VALUES(?, ?, now(), now())',
            //     [$employee['name'], $employee['description'], ]
            // );
        }
    }
}
