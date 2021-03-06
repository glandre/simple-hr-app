<?php

namespace App\Entities\Exceptions;

use Throwable;

class InvalidEntityException extends EntityException {
    public function __construct($message, $code = 0, Throwable $previous = null) {
        parent::__construct("Invalid Entity. $message", $code, $previous);
    }
}
