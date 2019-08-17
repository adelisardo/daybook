<?php

use App\Helper\Feeling;
use App\Models\Memory;
use App\Models\User;
use Illuminate\Support\Facades\Date;
use Laravel\Lumen\Testing\DatabaseMigrations;

class MemoryTest extends TestCase
{
    use DatabaseMigrations;

    public function testGetAll()
    {
        $count = random_int(4, 20);
        $user = factory(User::class)->create();
        factory(Memory::class, $count)->create(['user_id' => $user->id]);

        $this->get("memories", $this->headers($user));
        $this->seeStatusCode(200);
        $this->seeJsonStructure([
            'data' => ['*' => [
                'feeling',
                'memory_date_time',
                'title',
                'created_at',
                'updated_at',
            ]],
        ]);
    }
    public function testGetAllCheckDataIsolation()
    {
        $count = random_int(4, 20);
        $userMain = factory(User::class)->create();
        $user2 = factory(User::class)->create();
        factory(Memory::class, $count)->create(['user_id' => $userMain->id]);
        factory(Memory::class, 7)->create(['user_id' => $user2->id]);

        $this->get("memories", $this->headers($userMain));
        $this->seeStatusCode(200);
        $data = json_decode($this->response->content())->data;
        $this->assertIsArray($data);
        $this->assertEquals($count, count($data));
    }

    public function testRead()
    {
        $user = factory(User::class)->create();
        $memory = factory(Memory::class)->create(['user_id' => $user->id]);

        $this->get('memories/' . $memory->id, $this->headers($user));
        $this->seeStatusCode(200);
        $this->seeJsonStructure([
            'data' => [
                'feeling',
                'memory_date_time',
                'title',
                'context',
                'created_at',
                'updated_at',
            ],
        ]);
    }

    public function testCannotReadOfOtherUser()
    {
        $userMain = factory(User::class)->create();
        $user2 = factory(User::class)->create();
        $memory = factory(Memory::class)->create(['user_id' => $userMain->id]);

        $this->get('memories/' . $memory->id, $this->headers($user2));
        $this->assertNotFoundFailed();
    }

    public function testCreate()
    {
        $user = factory(User::class)->create();

        $params = [
            'feeling' => Feeling::HAPPINESS,
            'title' => 'Test title for memory',
        ];

        $this->post('memories', $params, $this->headers($user));
        $this->seeStatusCode(200);
        $this->seeJsonStructure(['id']);
        $this->seeInDatabase('memories', $params);
    }

    public function testCreateWithoutFeeling()
    {
        $user = factory(User::class)->create();

        $params = [
            'feeling' => null,
            'title' => 'Test title for memory',
        ];

        $this->post('memories', $params, $this->headers($user));
        $this->assertInputValidationsFailed();
    }

    public function testCreateIncorrectFeeling()
    {
        $user = factory(User::class)->create();

        $params = [
            'feeling' => 200,
            'title' => 'Test title for memory',
        ];

        $this->post('memories', $params, $this->headers($user));
        $this->assertInputValidationsFailed();
    }

    public function testCreateWithoutTitle()
    {
        $user = factory(User::class)->create();

        $params = [
            'feeling' => Feeling::HAPPINESS,
            'title' => '',
        ];

        $this->post('memories', $params, $this->headers($user));
        $this->assertInputValidationsFailed();
    }

    public function testUpdate()
    {
        $user = factory(User::class)->create();
        $memory = factory(Memory::class)->create(['user_id' => $user->id]);

        $params = [
            'feeling' => Feeling::HAPPINESS,
            'memory_date_time' => Date::now()->addDays(-200),
            'title' => 'Test title for memory',
            'context' => 'This text is just for test ...',
        ];

        $this->put('memories/' . $memory->id, $params, $this->headers($user));
        $this->seeStatusCode(200);
        $this->seeInDatabase('memories', $params);
        $this->notSeeInDatabase('memories', ['id' => $memory->id, 'title' => $memory->title]);
        $this->SeeInDatabase('memory_logs', ['memory_id' => $memory->id]);
    }

    public function testCannotUpdateOfOtherUser()
    {
        $userMain = factory(User::class)->create();
        $user2 = factory(User::class)->create();
        $memory = factory(Memory::class)->create(['user_id' => $userMain->id]);

        $params = [
            'feeling' => Feeling::HAPPINESS,
            'memory_date_time' => Date::now()->addDays(-200),
            'title' => 'Test title for memory',
            'context' => 'This text is just for test ...',
        ];

        $this->put('memories/' . $memory->id, $params, $this->headers($user2));
        $this->assertNotFoundFailed();
    }

    public function testUpdateWithoutFeeling()
    {
        $user = factory(User::class)->create();
        $memory = factory(Memory::class)->create(['user_id' => $user->id]);

        $params = [
            'feeling' => null,
            'memory_date_time' => Date::now()->addDays(-200),
            'title' => 'Test title for memory',
            'context' => 'This text is just for test ...',
        ];

        $this->put('memories/' . $memory->id, $params, $this->headers($user));
        $this->assertInputValidationsFailed();
    }
    public function testUpdateIncorrectFeeling()
    {
        $user = factory(User::class)->create();
        $memory = factory(Memory::class)->create(['user_id' => $user->id]);

        $params = [
            'feeling' => 200,
            'memory_date_time' => Date::now()->addDays(-200),
            'title' => 'Test title for memory',
            'context' => 'This text is just for test ...',
        ];

        $this->put('memories/' . $memory->id, $params, $this->headers($user));
        $this->assertInputValidationsFailed();
    }

    public function testUpdateWithoutMemoryDateTime()
    {
        $user = factory(User::class)->create();
        $memory = factory(Memory::class)->create(['user_id' => $user->id]);

        $params = [
            'feeling' => Feeling::HAPPINESS,
            'memory_date_time' => null,
            'title' => 'Test title for memory',
            'context' => 'This text is just for test ...',
        ];

        $this->put('memories/' . $memory->id, $params, $this->headers($user));
        $this->assertInputValidationsFailed();
    }

    public function testUpdateWithoutTitle()
    {
        $user = factory(User::class)->create();
        $memory = factory(Memory::class)->create(['user_id' => $user->id]);

        $params = [
            'feeling' => Feeling::HAPPINESS,
            'memory_date_time' => Date::now()->addDays(-200),
            'title' => '',
            'context' => 'This text is just for test ...',
        ];

        $this->put('memories/' . $memory->id, $params, $this->headers($user));
        $this->assertInputValidationsFailed();
    }

    public function testUpdateWithoutContext()
    {
        $user = factory(User::class)->create();
        $memory = factory(Memory::class)->create(['user_id' => $user->id]);

        $params = [
            'feeling' => Feeling::HAPPINESS,
            'memory_date_time' => Date::now()->addDays(-200),
            'title' => 'Test title for memory',
            'context' => '',
        ];

        $this->put('memories/' . $memory->id, $params, $this->headers($user));
        $this->assertInputValidationsFailed();
    }

    public function testDelete()
    {
        $user = factory(User::class)->create();
        $memory = factory(Memory::class)->create(['user_id' => $user->id]);

        $this->delete('memories/' . $memory->id, [], $this->headers($user));
        $this->seeStatusCode(200);
        $this->notSeeInDatabase('memories', ['id' => $memory->id]);
    }

    public function testCannotDeleteOfOtherUser()
    {
        $userMain = factory(User::class)->create();
        $user2 = factory(User::class)->create();
        $memory = factory(Memory::class)->create(['user_id' => $userMain->id]);

        $this->delete('memories/' . $memory->id, [], $this->headers($user2));
        $this->assertNotFoundFailed();
    }
}
