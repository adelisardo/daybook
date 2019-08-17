<?php

namespace App\Http\Controllers\Base;

use Laravel\Lumen\Routing\Controller as BaseController;

class Controller extends BaseController
{
    public function ok()
    {
        return response()->json([], 200);
    }
}
