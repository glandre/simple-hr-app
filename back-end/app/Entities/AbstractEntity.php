<?php

namespace App\Entities;

use App\Entities\Exceptions\InvalidEntityException;
use Illuminate\Support\Facades\Log;

abstract class AbstractEntity implements Entity {
    abstract public function clone(): Entity;
    abstract public function toArray(): array;
    abstract public function fromArray($array): Entity;
    abstract public function fromObject($object): Entity;
    abstract public function requiredFields(): array;
    
    /**
     * Validate the entity.
     * @throws InvalidEntityException if required fields are missing
     */
    public function validate(): void {
        $missingFields = $this->getMissingFields();
        if (count($missingFields) > 0) {
            throw new InvalidEntityException('The following fields are required: ' . implode(', ', $missingFields));
        }
    }

    public function isValid(): bool {
        $missingFields = $this->getMissingFields();
        return count($missingFields) === 0;
    }

    private function getMissingFields(): array {
        $requiredFields = $this->requiredFields();
        $missingFields = [];

        foreach ($requiredFields as $field) {
            if (empty($this->$field)) {
                $missingFields[] = $field;
            }
        }

        return $missingFields;
    }

    public function __toString() {
        return get_class($this) . ": " . json_encode($this->toArray());
    }
}

/**
 * Merge the entities passed as parameters by
 * overriding fields sequentially.
 * Each subsequent entity overrides the preivous values.
 * 
 * @return Entity the resulting Entity
 */
function mergeEntities(...$entities): Entity {
    if (count($entities) < 2) {
        return $entities[0];
    }

    $updates = $entities[0]->clone();

    $arrays = array_map(function($entity) {
        return is_array($entity) ? $entity : $entity->toArray();
    }, $entities);

    $merged = array_merge(...$arrays);

    $result = $updates->fromArray($merged);

    return $result;
}
