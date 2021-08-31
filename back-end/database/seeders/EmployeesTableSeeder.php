<?php

namespace Database\Seeders;

use Faker\Generator as Faker;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DepartmentsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run(Faker $faker)
    {

        // Let's truncate our existing records to start from scratch.
        DB::statement('DELETE FROM `employees`');

        // And now, let's create a few articles in our database:
        foreach ($fakeDepartments as $department) {
            DB::statement(
                'INSERT INTO `departments` (`name`, `description`, `created_at`, `updated_at`) VALUES(?, ?, now(), now())',
                [$department['name'], $department['description'], ]
            );
        }
    }
}
