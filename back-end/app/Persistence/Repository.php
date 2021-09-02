<?php

namespace App\Persistence;

use App\Entities\Entity;

interface Repository {
    public function create(Entity $entity): bool;
    public function retrieve($id): ?Entity;
    public function retrieveAll(): array;
    public function update(Entity $entity): bool;
    public function delete($id): bool;
    public function deleteAll(): int;
}
