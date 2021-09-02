<?php

namespace App\Entities;

interface Entity {
    public function isValid(): bool;
    public function validate(): void;
    public function toArray(): array;
    public function fromArray($array): Entity;
    public function fromObject($object): Entity;
    public function requiredFields(): array;
}
