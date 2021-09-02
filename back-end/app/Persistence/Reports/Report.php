<?php

namespace App\Persistence\Reports;

interface Report
{
    public function generate(): array;
}
