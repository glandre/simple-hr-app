<?php

namespace App\Persistence;

use App\Entities\Department;
use App\Entities\Entity;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class DepartmentRepository implements Repository {

    function __construct() {

        $this->TABLE_NAME = 'departments';

        $this->FIELDS = "
            id,
            name,
            description, 
            created_at as createdAt,
            updated_at as updatedAt
        ";

        $this->EDTIABLE_FIELDS = "
            name,
            description,
            updated_at
        ";

        $this->SELECT_DEPARTMENT_BY_ID = "SELECT $this->FIELDS FROM $this->TABLE_NAME WHERE id = ?";
        $this->SELECT_DEPARTMENTS = "SELECT $this->FIELDS FROM $this->TABLE_NAME";
        $this->INSERT_DEPARTMENT = "INSERT $this->TABLE_NAME SET ($this->EDTIABLE_FIELDS) VALUES(?, ?, ?)";
        $this->UPDATE_DEPARTMENT = "UPDATE $this->TABLE_NAME SET ($this->EDTIABLE_FIELDS) VALUES(?, ?, ?) WHERE id = ?";
        $this->DELETE_DEPARTMENT = "DELETE FROM $this->TABLE_NAME WHERE id = ?";
    }

    public function create(Entity $entity) {
        $department = $entity->getData();

        Log::debug('[DepartmentRepository.create] departments:');
        Log::debug($department);
        Log::debug('-----------------------');
    }

    public function retrieve($id){
        Log::debug("[DepartmentRepository.retrieve] id: $id");
        
        $result = DB::select($this->SELECT_DEPARTMENT_BY_ID, [$id]);

        Log::debug("[DepartmentRepository.retrieve] result:");
        Log::debug($result);
        Log::debug('-----------------------');

        $entities = $this->transform($result);

        Log::debug("[DepartmentRepository.retrieve] entities:");
        Log::debug($entities);
        Log::debug('-----------------------');

        if (count($entities) > 0) {
            Log::debug("[DepartmentRepository.retrieve] returning:");
            Log::debug($entities[0]->toArray());
            Log::debug('-----------------------');
            return $entities[0];
        }

        Log::debug("[DepartmentRepository.retrieve] returning null.");
        return null;
    }

    public function retrieveAll(){
        $result = DB::select($this->SELECT_DEPARTMENTS);
        return $this->transform($result);
    }

    public function update(Entity $entity){
        $result = DB::update($this->UPDATE_DEPARTMENT, [$entity->name, $entity->description, $entity->updatedAt]);
        Log::debug("[DepartmentRepository.delete] result:");
        Log::debug($result);
        Log::debug('-----------------------');

        return $this->transform($result);
    }

    public function delete($id){
        $result = DB::delete($this->DELETE_DEPARTMENT, [$id]);
        Log::debug("[DepartmentRepository.delete] result:");
        Log::debug($result);
        Log::debug('-----------------------');

        return $result;
    }


    private function transform($rawArray) {
        $entities = [];

        foreach($rawArray as $item) {
            $entity = new Department();
            $entity->fromObject($item);
            $entities[] = $entity;
        }

        return $entities;
    }
}
