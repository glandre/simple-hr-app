<?php

namespace App\Entities\Exceptions;

use Exception;
use Throwable;

class InvalidEntityException extends Exception {
    public function __construct($message, $code = 0, Throwable $previous = null) {
        // make sure everything is assigned properly
        parent::__construct("Invalid Entity. $message", $code, $previous);
    }
}
