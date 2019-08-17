<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Base\Controller;
use App\Models\User;

class ProfileController extends Controller
{
    public function read(Request $request)
    {
        $obj = \Auth::user();
        return User::read_profile($obj);
    }

    public function update(Request $request)
    {
        $this->validate($request, [
            'name' => 'required',
        ]);

        $obj = \Auth::user();
        $obj->name = $request->input('name');
        $obj->save();

        return $this->ok();
    }
}
