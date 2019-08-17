<?php

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Laravel\Lumen\Testing\DatabaseMigrations;

class UserTest extends TestCase
{
    use DatabaseMigrations;

    public function testSignUp()
    {
        $params = [
            'name' => 'Mehdi Adeli Sardo',
            'email' => 'adelisardo@gmail.com',
            'username' => 'adelisardo',
            'password' => '123$321',
        ];

        $this->post('sign_up', $params);
        $this->seeStatusCode(200);
        $this->seeJsonStructure($this->loginJsonStructure);

        unset($params['password']);
        $this->seeInDatabase('users', $params);
    }

    public function testSignUpWithEmptyName()
    {
        $params = [
            'name' => '',
            'email' => 'adelisardo@gmail.com',
            'username' => 'adelisardo',
            'password' => '123$321',
        ];

        $this->post('sign_up', $params);
        $this->assertInputValidationsFailed();
    }

    public function testSignUpWithEmptyEmail()
    {
        $params = [
            'name' => 'Mehdi Adeli Sardo',
            'email' => '',
            'username' => 'adelisardo',
            'password' => '123$321',
        ];

        $this->post('sign_up', $params);
        $this->assertInputValidationsFailed();
    }

    public function testSignUpWithIncorrectEmail()
    {
        $params = [
            'name' => 'Mehdi Adeli Sardo',
            'email' => 'sdlfm21', //Incorrect
            'username' => 'adelisardo',
            'password' => '123$321',
        ];

        $this->post('sign_up', $params);
        $this->assertInputValidationsFailed();
    }

    public function testSignUpWithDuplicateEmail()
    {
        $params1 = [
            'name' => 'Mehdi Adeli Sardo',
            'email' => 'adelisardo@gmail.com',
            'username' => 'adelisardo',
            'password' => '123$321',
        ];

        $params2 = [
            'name' => 'Jony Ive',
            'email' => 'adelisardo@gmail.com',
            'username' => 'jonyive',
            'password' => '34$493',
        ];

        $this->post('sign_up', $params1, []);
        $this->seeStatusCode(200);
        $this->seeJsonStructure($this->loginJsonStructure);

        $this->post('sign_up', $params2);
        $this->assertInputValidationsFailed();
    }

    public function testSignUpWithEmptyUsername()
    {
        $params = [
            'name' => 'Mehdi Adeli Sardo',
            'email' => 'adelisardo@gmail.com',
            'username' => '',
            'password' => '123$321',
        ];

        $this->post('sign_up', $params);
        $this->assertInputValidationsFailed();
    }

    public function testSignUpWithDuplicateUsername()
    {
        $params1 = [
            'name' => 'Mehdi Adeli Sardo',
            'email' => 'adelisardo@gmail.com',
            'username' => 'adelisardo',
            'password' => '123$321',
        ];

        $params2 = [
            'name' => 'Jony Ive',
            'email' => 'jonyive@gmail.com',
            'username' => 'adelisardo',
            'password' => '34$493',
        ];

        $this->post('sign_up', $params1, []);
        $this->seeStatusCode(200);
        $this->seeJsonStructure($this->loginJsonStructure);

        $this->post('sign_up', $params2);
        $this->assertInputValidationsFailed();
    }

    public function testSignUpWithEmptyPassword()
    {
        $params = [
            'name' => 'Mehdi Adeli Sardo',
            'email' => 'adelisardo@gmail.com',
            'username' => 'adelisardo',
            'password' => '',
        ];

        $this->post('sign_up', $params);
        $this->assertInputValidationsFailed();
    }

    public function testLoginByEmail()
    {
        $password = Str::random(10);
        $user = factory(User::class)->create(['password' => Hash::make($password)]);

        $params = [
            'user_key' => $user->email,
            'password' => $password,
        ];
        $this->post('login', $params);
        $this->seeStatusCode(200);
        $this->seeJsonStructure($this->loginJsonStructure);
    }

    public function testLoginByUsername()
    {
        $password = Str::random(10);
        $user = factory(User::class)->create(['password' => Hash::make($password)]);

        $params = [
            'user_key' => $user->username,
            'password' => $password,
        ];
        $this->post('login', $params);
        $this->seeStatusCode(200);
        $this->seeJsonStructure($this->loginJsonStructure);
    }

    public function testLoginWithEmptyUserKey()
    {
        $password = Str::random(10);

        $params = [
            'user_key' => '',
            'password' => $password,
        ];

        $this->post('login', $params);
        $this->assertLoginFailed();
    }

    public function testLoginWithEmptyPassword()
    {
        $password = Str::random(10);
        $user = factory(User::class)->create(['password' => Hash::make($password)]);

        $params = [
            'user_key' => $user->username,
            'password' => '',
        ];

        $this->post('login', $params);
        $this->assertLoginFailed();
    }
    public function testLoginWithIncorrectUserKey()
    {
        $password = Str::random(10);
        $user = factory(User::class)->create(['password' => Hash::make($password)]);

        $params = [
            'user_key' => $user->username . 'incorrect',
            'password' => $password,
        ];

        $this->post('login', $params);
        $this->assertLoginFailed();
    }
    public function testLoginWithIncorrectPassword()
    {
        $password = Str::random(10);
        $user = factory(User::class)->create(['password' => Hash::make($password)]);

        $params = [
            'user_key' => $user->username,
            'password' => $password . 'incorrect',
        ];

        $this->post('login', $params);
        $this->assertLoginFailed();
    }

    public function testLogout()
    {
        $user = factory(User::class)->create();

        $this->post('logout', [], $this->headers($user));
        $this->seeStatusCode(200);
        $this->seeInDatabase('users', [
            'id' => $user->id,
            'token' => null,
        ]);
    }

    public function testGetProfile()
    {
        $user = factory(User::class)->create();

        $this->get('profile', $this->headers($user));
        $this->seeStatusCode(200);
        $this->seeJsonStructure($this->profileJsonStructure);
    }

    public function testUpdateProfile()
    {
        $user = factory(User::class)->create();

        $params = ['name' => 'Mehdi Adeli Sardo'];

        $this->put('profile', $params, $this->headers($user));
        $this->seeStatusCode(200);
        $this->seeInDatabase('users',
            [
                'id' => $user->id,
                'name' => $params['name'],
            ]);
    }
    
    public function testUpdateProfileWithEmptyName()
    {
        $user = factory(User::class)->create();

        $params = ['name' => ''];

        $this->put('profile', $params, $this->headers($user));
        $this->assertInputValidationsFailed();
    }
}
