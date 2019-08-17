<?php

/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| Here you may define all of your model factories. Model factories give
| you a convenient way to create models for testing and seeding your
| database. Just tell the factory how a default model should look.
|
 */

use App\Models\Memory;
use App\Models\User;
use Faker\Provider\Uuid;
use Illuminate\Support\Facades\Hash;

$factory->define(User::class, function (Faker\Generator $faker) {
    return [
        'name' => $faker->name,
        'email' => $faker->unique()->safeEmail,
        'username' => $faker->unique()->userName,
        'password' => Hash::make($faker->password),
        'email_conf_token' => Uuid::uuid(),
        'email_confirmed' => true,
        'is_locked' => false,
        'token' => base64_encode(str_random(100)),
    ];
});

$factory->define(Memory::class, function (Faker\Generator $faker) {
    return [
        'user_id' => function () {
            return factory(User::class)->create()->id;
        },
        'feeling' => random_int(1, 6),
        'memory_date_time' => $faker->dateTimeBetween('-4 years', 'now'),
        'title' => $faker->text(20),
        'context' => $faker->paragraph,
    ];
});
