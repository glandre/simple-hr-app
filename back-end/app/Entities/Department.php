<?php

namespace App\Entities;

class Department extends AbstractEntity implements Entity {
    public $id = null;
    public $name = null;
    public $description = null;
    public $createdAt = null;
    public $updatedAt = null;

    public function toArray() {
        return array(
            'id' => $this->id,
            'name' => $this->name,
            'description' => $this->description,
            'createdAt' => $this->createdAt,
            'updatedAt' => $this->updatedAt,
        );
    }

    public function fromArray($array) {
        $this->id = $array['id'];
        $this->name = $array['name'];
        $this->description = $array['description'];
        $this->createdAt = $array['createdAt'];
        $this->updatedAt = $array['updatedAt'];
    }

    public function fromObject($object) {
        $this->id = $object->id;
        $this->name = $object->name;
        $this->description = $object->description;
        $this->createdAt = $object->createdAt;
        $this->updatedAt = $object->updatedAt;
    }

    public function requiredFields(): array
    {
        return ['name'];
    }
}
