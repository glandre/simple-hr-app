<?php

namespace App\Persistence;

use App\Entities\Employee;
use App\Entities\Entity;

class EmployeeRepository extends AbstractRepository implements Repository {

    function __construct() {
        $TABLE_NAME = 'employees';

        $FIELDS = "
            id,
            email,
            first_name as firstName,
            last_name as lastName, 
            department_id as departmentId,
            created_at as createdAt,
            updated_at as updatedAt
        ";

        $EDTIABLE_FIELDS = "
            email,
            first_name,
            last_name,
            department_id,
            updated_at,
            created_at
        ";

        $this->queries = new \stdClass();
        $this->queries->SELECT_BY_ID = "SELECT $FIELDS FROM $TABLE_NAME WHERE id = ?";
        $this->queries->SELECT_ALL = "SELECT $FIELDS FROM $TABLE_NAME";
        $this->queries->INSERT = "INSERT INTO $TABLE_NAME ($EDTIABLE_FIELDS) VALUES(?, ?, ?, ?, now(), now())";
        $this->queries->UPDATE = "UPDATE $TABLE_NAME SET ($EDTIABLE_FIELDS) VALUES(?, ?, ?, ?, now()) WHERE id = ?";
        $this->queries->DELETE = "DELETE FROM $TABLE_NAME WHERE id = ?";
        $this->queries->DELETE_ALL = "DELETE FROM $TABLE_NAME";
    }

    protected function getQueries() {
        return $this->queries;
    }

    protected function getEditableFields($entity) {
        return [$entity->email, $entity->firstName, $entity->lastName, $entity->departmentId];
    }

    protected function buildEntities($queryResult) {
        $entities = [];

        foreach($queryResult as $item) {
            $entity = new Employee();
            $entity->fromObject($item);
            $entities[] = $entity;
        }

        return $entities;
    }
}
