<?php

namespace App\Http\Controllers;

use App\Helper\ErrorResult;
use App\Http\Controllers\Base\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class UserController extends Controller
{
    public function signUp(Request $request)
    {
        $this->validate($request, [
            'name' => 'required',
            'email' => 'required|email|unique:users',
            'username' => 'required|unique:users',
            'password' => 'required',
        ]);

        $obj = new User();
        $obj->name = $request->input('name');
        $obj->email = $request->input('email');
        $obj->username = $request->input('username');
        $obj->password = Hash::make($request->input('password'));
        $obj->email_conf_token = Str::random(10);
        //Do something for this line !
        $obj->email_confirmed = true;
        $obj->is_locked = false;
        $obj->save();
        return User::login($obj);
    }

    public function login(Request $request)
    {
        $user_key = $request->input('user_key');
        $password = $request->input('password');

        $obj = User::orWhere(['username' => $user_key, 'email' => $user_key])->where('is_locked', false)->first();
        if ($obj && Hash::check($password, $obj->password)) {
            return User::login($obj);
        } else {
            return ErrorResult::LoginFailed();
        }
    }

    public function logout()
    {
        $user = \Auth::user();
        $user->token = null;
        $user->save();
        return $this->ok();
    }
}
