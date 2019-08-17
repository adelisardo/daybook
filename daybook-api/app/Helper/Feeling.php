<?php

namespace App\Helper;

use MyCLabs\Enum\Enum;

class Feeling extends Enum
{
    const HAPPINESS = 1;
    const SADNESS = 2;
    const FEAR = 3;
    const DISGUST = 4;
    const ANGER = 5;
    const SURPRISE = 6;
    
    const MIN = 1;
    const MAX = 6;
}
