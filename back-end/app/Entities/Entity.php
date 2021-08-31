<?php

namespace App\Entities;

interface Entity {
    public function toArray();
    public function fromArray($array);
    public function fromObject($object);
}
