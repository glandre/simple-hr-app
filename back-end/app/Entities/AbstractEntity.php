<?php

namespace App\Entities;

use App\Entities\Exceptions\InvalidEntityException;

abstract class AbstractEntity implements Entity {
    abstract public function toArray();
    abstract public function fromArray($array);
    abstract public function fromObject($object);
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
}
