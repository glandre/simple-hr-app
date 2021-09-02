<?php

namespace App\Entities;

class Employee extends AbstractEntity implements Entity
{
    public $id = null;
    public $email = null;
    public $firstName = null;
    public $lastName = null;
    public $departmentId = null;
    public $createdAt = null;
    public $updatedAt = null;

    public function clone(): Employee
    {
        return (new Employee())->fromObject($this);
    }

    public function toArray(): array {
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

    public function fromArray($array): Employee
    {
        if (isset($array['id']))
        {
            $this->id = $array['id'];
        }
        
        if (isset($array['email']))
        {
            $this->email = $array['email'];
        }
        
        if (isset($array['firstName']))
        {
            $this->firstName = $array['firstName'];
        }
        
        if (isset($array['lastName']))
        {
            $this->lastName = $array['lastName'];
        }
        
        if (isset($array['departmentId']))
        {
            $this->departmentId = $array['departmentId'];
        }
        
        if (isset($array['createdAt']))
        {
            $this->createdAt = $array['createdAt'];
        }
        
        if (isset($array['updatedAt']))
        {
            $this->updatedAt = $array['updatedAt'];
        }

        return $this;
    }

    public function fromObject($object): Employee
    {
        if (isset($object->id))
        {
            $this->id = $object->id;
        }
        
        if (isset($object->email))
        {
            $this->email = $object->email;
        }
        
        if (isset($object->firstName))
        {
            $this->firstName = $object->firstName;
        }
        
        if (isset($object->lastName))
        {
            $this->lastName = $object->lastName;
        }
        
        if (isset($object->departmentId))
        {
            $this->departmentId = $object->departmentId;
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
        return ['email', 'firstName', 'lastName', 'departmentId'];
    }
}
