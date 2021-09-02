<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

class CreateEmployeesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::statement('CREATE TABLE employees (
            `id` bigint unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
            `email` VARCHAR(255) NOT NULL UNIQUE,
            `first_name` VARCHAR(255) NOT NULL,
            `last_name` VARCHAR(255) NOT NULL,
            `department_id` bigint unsigned,
            `created_at` timestamp,
            `updated_at` timestamp,
            INDEX dep_id(department_id),
            FOREIGN KEY (department_id)
                REFERENCES departments(id)
                ON DELETE RESTRICT
        )');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::statement('DROP TABLE IF EXISTS employees');
    }
}
