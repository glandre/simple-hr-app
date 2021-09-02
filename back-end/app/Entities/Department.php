<?php

namespace App\Entities;

class Department extends AbstractEntity implements Entity {
    public $id = null;
    public $name = null;
    public $description = null;
    public $createdAt = null;
    public $updatedAt = null;

    public function clone(): Department
    {
        return (new Department())->fromObject($this);
    }

    public function toArray(): array
    {
        return array(
            'id' => $this->id ?? null,
            'name' => $this->name ?? null,
            'description' => $this->description ?? null,
            'createdAt' => $this->createdAt ?? null,
            'updatedAt' => $this->updatedAt ?? null,
        );
    }

    public function fromArray($array): Department
    {
        if(isset($array['id']))
        {
            $this->id = $array['id'];
        }
        
        if(isset($array['name']))
        {
            $this->name = $array['name'];
        }
        
        if(isset($array['description']))
        {
            $this->description = $array['description'];
        }
        
        if(isset($array['createdAt']))
        {
            $this->createdAt = $array['createdAt'];
        }
        
        if(isset($array['updatedAt']))
        {
            $this->updatedAt = $array['updatedAt'];
        }
        
        return $this;
    }

    public function fromObject($object): Department
    {
        if (isset($object->id))
        {
            $this->id = $object->id;
        }

        if (isset($object->name))
        {
            $this->name = $object->name;
        }

        if (isset($object->description))
        {
            $this->description = $object->description;
        }

        if (isset($object->createdAt))
        {
            $this->createdAt = $object->createdAt;
        }

        if (isset($object->updatedAt))
        {
            $this->updatedAt = $object->updatedAt;
        }
        return $this;
    }

    public function requiredFields(): array
    {
        return ['name'];
    }
}
