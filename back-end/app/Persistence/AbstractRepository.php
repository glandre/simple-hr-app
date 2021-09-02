<?php

namespace App\Persistence;

use App\Entities\Entity;
use Illuminate\Support\Facades\DB;

abstract class AbstractRepository implements Repository {
    /**
     * This method is responsible for returning an object
     * with all the SQL queries with the following attributes:
     *
     *   SELECT_BY_ID: Query to select an entity by ID;
     *   SELECT_ALL: Query to select all entities;
     *   INSERT: Query to insert an entity into its corresponding table;
     *   UPDATE: Query to update an entity;
     *   DELETE: Query to delete an entity.
     *   DELETE_ALL: Query to delete all entities.
     */
    abstract protected function getQueries();

    /**
     * Returns an array with the actual values
     * of the editable fields from the $entity passed.
     */
    abstract protected function getEditableFields($entity);

    /**
     * Transforms a query result into an array of Entities
     */
    abstract protected function buildEntities($queryResult);

    /**
     * Inserts a new entity in the table.
     * @return true if one entry was successfully created.
     */
    public function create(Entity $entity): bool
    {
        $result = DB::insert($this->getQueries()->INSERT, $this->getEditableFields($entity));
        return $result === 1;
    }

    /**
     * Retrieves an entity from the table based on its id.
     */
    public function retrieve($id): ?Entity
    {       
        $result = DB::select($this->getQueries()->SELECT_BY_ID, [$id]);
        $entities = $this->buildEntities($result);
        if (count($entities) > 0) {
            return $entities[0];
        }
        return null;
    }

    /**
     * Retrieves all entities from the table.
     */
    public function retrieveAll(): array
    {
        $result = DB::select($this->getQueries()->SELECT_ALL);
        return $this->buildEntities($result);
    }

    /**
     * Updates an entity in the table.
     * @return true if one entry was successfully updated.
     */
    public function update(Entity $entity): bool
    {
        $fields = $this->getEditableFields($entity);
        $fields[] = $entity->id;

        $result = DB::update($this->getQueries()->UPDATE, $fields);

        return $result === 1;
    }

    /**
     * Deletes an entity from the table
     * @return true if one entry was successfully deleted.
     */
    public function delete($id): bool
    {
        $result = DB::delete($this->getQueries()->DELETE, [$id]);
        return $result === 1;
    }

    /**
     * Deletes an entity from the table
     * @return the number of affected rows
     */
    public function deleteAll(): int
    {
        $result = DB::delete($this->getQueries()->DELETE_ALL);
        return $result;
    }   
}
