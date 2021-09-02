<?php

namespace App\Persistence;

use App\Entities\Entity;
use App\Entities\Exceptions\InvalidEntityException;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

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
    public function create(Entity $entity): bool {
        $result = DB::insert($this->getQueries()->INSERT, $this->getEditableFields($entity));
        Log::debug("[AbstractRepository.create] result: " . $result);

        return $result === 1;
    }

    /**
     * Retrieves an entity from the table based on its id.
     */
    public function retrieve($id): Entity {
        Log::debug("[AbstractRepository.retrieve] id: $id");
        
        $result = DB::select($this->getQueries()->SELECT_BY_ID, [$id]);

        Log::debug("[AbstractRepository.retrieve] result:");
        Log::debug($result);
        Log::debug('-----------------------');

        $entities = $this->buildEntities($result);

        Log::debug("[AbstractRepository.retrieve] entities:");
        Log::debug($entities);
        Log::debug('-----------------------');

        if (count($entities) > 0) {
            Log::debug("[AbstractRepository.retrieve] returning:");
            Log::debug($entities[0]->toArray());
            Log::debug('-----------------------');
            return $entities[0];
        }

        Log::debug("[AbstractRepository.retrieve] returning null.");
        return null;
    }

    /**
     * Retrieves all entities from the table.
     */
    public function retrieveAll(): array {
        $result = DB::select($this->getQueries()->SELECT_ALL);
        return $this->buildEntities($result);
    }

    /**
     * Updates an entity in the table.
     * @return true if one entry was successfully updated.
     */
    public function update(Entity $entity): bool{
        $result = DB::update($this->getQueries()->UPDATE, $this->getEditableFields($entity));
        Log::debug("[AbstractRepository.update] result: " . $result);

        return $result === 1;
    }

    /**
     * Deletes an entity from the table
     * @return true if one entry was successfully deleted.
     */
    public function delete($id): bool{
        $result = DB::delete($this->getQueries()->DELETE, [$id]);
        Log::debug("[AbstractRepository.delete] result: " . $result);

        return $result === 1;
    }

    /**
     * Deletes an entity from the table
     * @return the number of affected rows
     */
    public function deleteAll(): int {
        $result = DB::delete($this->getQueries()->DELETE_ALL);
        Log::debug("[AbstractRepository.deleteAll] result: " . $result);

        return $result;
    }   
}
