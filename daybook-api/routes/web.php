<?php

$router->group([], function () use ($router) {
    //CommonInformationController
    $router->get('commonInformation', 'CommonInformationController@read');

    //ConnectionController
    $router->get('connection', 'ConnectionController@get');

    //UserController
    $router->post('sign_up', 'UserController@signUp');
    $router->post('login', 'UserController@login');
});

$router->group(['middleware' => 'auth'], function () use ($router) {
    //UserController
    $router->post('logout', 'UserController@logout');

    //ProfileController
    $router->get('profile', 'ProfileController@read');
    $router->put('profile', 'ProfileController@update');

    //MemoryController
    $router->get('memories', 'MemoryController@getAll');
    $router->get('memories/{id}', 'MemoryController@read');
    $router->post('memories', 'MemoryController@create');
    $router->put('memories/{id}', 'MemoryController@update');
    $router->delete('memories/{id}', 'MemoryController@delete');
});
