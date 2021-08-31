<?php

namespace App\Entities;

class Employee implements Entity {
    public $id = null;
    public $firstName = null;
    public $lastName = null;
    public $departmentId = null;
    public $createdAt = null;
    public $updatedAt = null;

    public function toArray() {
        return array(
            'id' => $this->id,
            'firstName' => $this->firstName,
            'lastName' => $this->lastName,
            'departmentId' => $this->departmentId,
            'createdAt' => $this->createdAt,
            'updatedAt' => $this->updatedAt,
        );
    }

    public function fromArray($array) {
        $this->id = $array['id'];
        $this->firstName = $array['firstName'];
        $this->lastName = $array['lastName'];
        $this->departmentId = $array['departmentId'];
        $this->createdAt = $array['createdAt'];
        $this->updatedAt = $array['updatedAt'];
    }

    public function fromObject($object) {
        $this->id = $object->id;
        $this->firstName = $object->firstName;
        $this->lastName = $object->lastName;
        $this->departmentId = $object->departmentId;
        $this->createdAt = $object->createdAt;
        $this->updatedAt = $object->updatedAt;
    }
}
