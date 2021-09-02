<?php

namespace App\Entities;

class Employee extends AbstractEntity implements Entity {
    public $id = null;
    public $email = null;
    public $firstName = null;
    public $lastName = null;
    public $departmentId = null;
    public $createdAt = null;
    public $updatedAt = null;

    public function toArray() {
        return array(
            'id' => $this->id,
            'email' => $this->email,
            'firstName' => $this->firstName,
            'lastName' => $this->lastName,
            'departmentId' => $this->departmentId,
            'createdAt' => $this->createdAt,
            'updatedAt' => $this->updatedAt,
        );
    }

    public function fromArray($array) {
        $this->id = $array['id'];
        $this->email = $array['email'];
        $this->firstName = $array['firstName'];
        $this->lastName = $array['lastName'];
        $this->departmentId = $array['departmentId'];
        $this->createdAt = $array['createdAt'];
        $this->updatedAt = $array['updatedAt'];
    }

    public function fromObject($object) {
        $this->id = $object->id;
        $this->email = $object->email;
        $this->firstName = $object->firstName;
        $this->lastName = $object->lastName;
        $this->departmentId = $object->departmentId;
        $this->createdAt = $object->createdAt;
        $this->updatedAt = $object->updatedAt;
    }

    public function requiredFields(): array
    {
        return ['email', 'firstName', 'lastName', 'departmentId'];
    }
}
