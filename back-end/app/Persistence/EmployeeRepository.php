<?php

namespace App\Persistence;

use App\Entities\Employee;
use Illuminate\Support\Facades\DB;
use stdClass;

class EmployeeRepository extends AbstractRepository implements Repository 
{
    public function retrieveByEmail($email): ?Employee {
        $tableName = $this->getQueries()->TABLE_NAME;
        $fields = $this->getQueries()->FIELDS;

        $result = DB::select(
            "SELECT $fields FROM $tableName WHERE email = ?", [$email]
        );

        $entities = $this->buildEntities($result);

        if (count($entities) > 0) {
            return $entities[0];
        }

        return null;
    }

    public function retrieveByDepartmentId($departmentId): array {
        $tableName = $this->getQueries()->TABLE_NAME;
        $fields = $this->getQueries()->FIELDS;

        $result = DB::select(
            "SELECT $fields FROM $tableName WHERE department_id = ?", [$departmentId]
        );

        return $this->buildEntities($result);
    }

    function __construct()
    {
        $TABLE_NAME = 'employees';

        $FIELDS = "
            id,
            email,
            first_name as firstName,
            last_name as lastName,
            annual_salary as annualSalary,
            department_id as departmentId,
            created_at as createdAt,
            updated_at as updatedAt
        ";

        $this->queries = new stdClass();

        $this->queries->TABLE_NAME = $TABLE_NAME;
        $this->queries->FIELDS = $FIELDS;

        $this->queries->SELECT_BY_ID = "SELECT $FIELDS FROM $TABLE_NAME WHERE id = ?";
        $this->queries->SELECT_ALL = "SELECT $FIELDS FROM $TABLE_NAME";

        $this->queries->INSERT = "INSERT INTO $TABLE_NAME (
            email,
            first_name,
            last_name,
            annual_salary,
            department_id,
            updated_at,
            created_at
        ) VALUES(?, ?, ?, ?, ?, now(), now())";
        
        $this->queries->UPDATE = "UPDATE $TABLE_NAME SET 
            email = ?,
            first_name = ?,
            last_name = ?,
            annual_salary = ?,
            department_id = ?,
            updated_at = now()
        WHERE id = ?";

        $this->queries->DELETE = "DELETE FROM $TABLE_NAME WHERE id = ?";
        $this->queries->DELETE_ALL = "DELETE FROM $TABLE_NAME";
    }

    protected function getQueries()
    {
        return $this->queries;
    }

    protected function getEditableFields($entity)
    {
        return [
            $entity->email,
            $entity->firstName,
            $entity->lastName,
            $entity->annualSalary,
            $entity->departmentId
        ];
    }

    protected function buildEntities($queryResult)
    {
        $entities = [];

        foreach($queryResult as $item)
        {
            $entity = new Employee();
            $entity->fromObject($item);
            $entities[] = $entity;
        }

        return $entities;
    }
}
