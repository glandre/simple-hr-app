<?php

namespace App\Persistence;

use App\Entities\Entity;

interface Repository {
    public function create(Entity $entity);
    public function retrieve($id);
    public function retrieveAll();
    public function update(Entity $entity);
    public function delete($id);
    public function deleteAll();
}
