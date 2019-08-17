<?php

namespace App\Models;

use Illuminate\Auth\Authenticatable;
use Illuminate\Contracts\Auth\Access\Authorizable as AuthorizableContract;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Database\Eloquent\Model;
use Laravel\Lumen\Auth\Authorizable;

class User extends Model implements AuthenticatableContract, AuthorizableContract
{
    use Authenticatable, Authorizable;

    protected $fillable = [];

    protected $hidden = [
        'password',
        'token',
        'created_at',
        'updated_at',
    ];

    protected $casts = [
        'is_locked' => 'boolean',
    ];

    public static function login($user)
    {
        $token = base64_encode(str_random(100));
        $user->token = $token;
        $user->update();
        return [
            'token' => $token,
            'profile' => User::read_profile($user),
        ];
    }
    public static function read_profile($user)
    {
        if ($user) {
            return [
                "name" => $user->name,
                "email" => $user->email,
                "username" => $user->username,
            ];
        } else {
            return null;
        }
    }
}
