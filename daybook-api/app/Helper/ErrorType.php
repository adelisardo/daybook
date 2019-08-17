<?php

namespace App\Helper;

use MyCLabs\Enum\Enum;

class ErrorType extends Enum
{
    const EXCEPTION = 0;
    const INPUT_VALIDATION = 1;
    const CUSTOM = 2;
}
