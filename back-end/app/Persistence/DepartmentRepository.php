<?php

namespace App\Persistence;

use App\Entities\Department;
use App\Entities\Entity;

class DepartmentRepository extends AbstractRepository implements Repository {

    function __construct() {
        $TABLE_NAME = 'departments';

        $FIELDS = "
            id,
            name,
            description, 
            created_at as createdAt,
            updated_at as updatedAt
        ";

        $EDTIABLE_FIELDS = "
            name,
            description,
            updated_at,
            created_at
        ";

        $this->queries = new \stdClass();
        $this->queries->SELECT_BY_ID = "SELECT $FIELDS FROM $TABLE_NAME WHERE id = ?";
        $this->queries->SELECT_ALL = "SELECT $FIELDS FROM $TABLE_NAME";
        $this->queries->INSERT = "INSERT $TABLE_NAME SET ($EDTIABLE_FIELDS) VALUES(?, ?, now(), now())";
        $this->queries->UPDATE = "UPDATE $TABLE_NAME SET ($EDTIABLE_FIELDS) VALUES(?, ?, ?) WHERE id = ?";
        $this->queries->DELETE = "DELETE FROM $TABLE_NAME WHERE id = ?";
        $this->queries->DELETE_ALL = "DELETE FROM $TABLE_NAME";
    }

    protected function getQueries() {
        return $this->queries;
    }

    protected function getEditableFields($entity) {
        return [$entity->name, $entity->description, $entity->updatedAt];
    }

    protected function buildEntities($queryResult) {
        $entities = [];

        foreach($queryResult as $item) {
            $entity = new Department();
            $entity->fromObject($item);
            $entities[] = $entity;
        }

        return $entities;
    }
}