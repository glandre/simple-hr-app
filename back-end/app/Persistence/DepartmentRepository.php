<?php

namespace App\Persistence;

use App\Entities\Department;
use Illuminate\Support\Facades\DB;
use stdClass;

class DepartmentRepository extends AbstractRepository implements Repository {

    public function retrieveByName($name): ?Department {
        $tableName = $this->getQueries()->TABLE_NAME;
        $fields = $this->getQueries()->FIELDS;

        $result = DB::select(
            "SELECT $fields FROM $tableName WHERE name = ?", [$name]
        );

        $entities = $this->buildEntities($result);

        if (count($entities) > 0) {
            return $entities[0];
        }

        return null;

    }

    function __construct() {
        $TABLE_NAME = 'departments';

        $FIELDS = "
            id,
            name,
            description,
            updated_at as updatedAt,
            created_at as createdAt
        ";

        $this->queries = new stdClass();

        $this->queries->TABLE_NAME = $TABLE_NAME;
        $this->queries->FIELDS = $FIELDS;

        $this->queries->SELECT_BY_ID = "SELECT $FIELDS FROM $TABLE_NAME WHERE id = ?";
        $this->queries->SELECT_BY_UNIQUE_FIELD = "SELECT $FIELDS FROM $TABLE_NAME WHERE ? = ?";
        $this->queries->SELECT_ALL = "SELECT $FIELDS FROM $TABLE_NAME";
        
        $this->queries->INSERT = "INSERT INTO $TABLE_NAME (
            name,
            description,
            updated_at,
            created_at
        ) VALUES(?, ?, now(), now())";
        
        $this->queries->UPDATE = "UPDATE $TABLE_NAME SET
            name = ?,
            description = ?,
            updated_at = now()
        WHERE id = ?";
        
        $this->queries->DELETE = "DELETE FROM $TABLE_NAME WHERE id = ?";
        $this->queries->DELETE_ALL = "DELETE FROM $TABLE_NAME";
    }

    protected function getQueries() {
        return $this->queries;
    }

    protected function getEditableFields($entity) {
        return [$entity->name, $entity->description];
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
