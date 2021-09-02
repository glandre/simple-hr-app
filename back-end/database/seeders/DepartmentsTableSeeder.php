<?php

namespace Database\Seeders;

use App\Entities\Department;
use Illuminate\Database\Seeder;

use App\Persistence\DepartmentRepository;
use App\Persistence\EmployeeRepository;

class DepartmentsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        $fakeDepartments = [
            [
                'name' => 'General Management',
                'description' => 'This department develops and executes overall business strategies. It is responsible for the entire organization. General management deals with determining overall business strategies, planning, monitoring execution of the plans, decision making, and guiding the workforce, and maintaining punctuality and disciplinary issues.'
            ],
            [
                'name' => 'Marketing',
                'description' => 'The workforce in this department is responsible in identifying customer needs and creating tourism products to satisfy them.'
            ],
            [
                'name' => 'Operations',
                'description' => 'The Operations Department combines two or more tourism components (among attractions, transportation, intermediaries, destination, accommodation, and activities) to create a package and sell it to the consumer.'
            ],
            [
                'name' => 'Finance',
                'description' => 'The Finance Department is responsible for acquiring and utilizing money for financing the activities of the tourism business. The finance people assess short term and long term capital requirements.'
            ],
            [
                'name' => 'Sales',
                'description' => 'This department is solely responsible for selling the relevant tourism products to the consumers. The sales person in the tourism business is the first link between the tourism business itself and the consumer. The staff must have deep knowledge of the product and strong communication skills to convince the consumers.'
            ],
            [
                'name' => 'Human Resource',
                'description' => 'This department is responsible for recruiting skilled, and experienced manpower according to the positions at vacancies of different departments. It is also responsible for conducting orientation programs and trainings for new staff, recognizing the best facets of staff and motivating them to achieve organization objectives.'
            ],
            [
                'name' => 'Purchase',
                'description' => 'By following a standard procedure of procurement, this department ensures the enterprise has appropriate and timely supply of all the required goods and services. The purchasing department procures the goods and services to be consumed by other departments in the business organization.'
            ]
        ];

        $departmentRepository = new DepartmentRepository();
        $employeeRepository = new EmployeeRepository();

        // Let's truncate our existing records to start from scratch.
        $employeeRepository->deleteAll();
        $departmentRepository->deleteAll();

        // And now, let's create a few articles in our database:
        foreach ($fakeDepartments as $department) {
            $entity = new Department();
            $entity->name = $department['name'];
            $entity->description = $department['description'];
            $departmentRepository->create($entity);
        }
    }
}
