<?php

abstract class TestCase extends Laravel\Lumen\Testing\TestCase
{
    /**
     * Creates the application.
     *
     * @return \Laravel\Lumen\Application
     */
    public function createApplication()
    {
        return require __DIR__ . '/../bootstrap/app.php';
    }

    public $loginJsonStructure = [
        'token',
        'profile' => [
            'name',
            'email',
            'username',
        ],
    ];

    public $handelErrorJsonStructure = [
        'errorType',
        'errorCode',
        'message',
    ];

    public $profileJsonStructure = [
        'name',
        'email',
        'username',
    ];

    public $generalGetJsonStructure = [
        'data'
    ];

    public $inputValidationsChecking = [
        'errorType' => 1,
        'errorCode' => 101,
    ];

    public $notFoundFailedChecking = [
        'errorType' => 2,
        'errorCode' => 201,
    ];

    public $loginFailedChecking = [
        'errorType' => 2,
        'errorCode' => 202,
    ];


    protected function headers($user = null)
    {
        $headers = ['Accept' => 'application/json'];

        if (!is_null($user)) {
            $headers['Authorization'] = $user->token;
        }

        return $headers;
    }

    public function assertInputValidationsFailed()
    {
        $this->seeStatusCode(400);
        $this->seeJsonStructure($this->handelErrorJsonStructure);
        $this->seeJsonContains($this->inputValidationsChecking);
    }
    
    public function assertNotFoundFailed()
    {
        $this->seeStatusCode(400);
        $this->seeJsonStructure($this->handelErrorJsonStructure);
        $this->seeJsonContains($this->notFoundFailedChecking);
    }

    public function assertLoginFailed()
    {
        $this->seeStatusCode(400);
        $this->seeJsonStructure($this->handelErrorJsonStructure);
        $this->seeJsonContains($this->loginFailedChecking);
    }
}
