<?php

class ConnectionTest extends TestCase
{
    public function testConnectionTest()
    {
        $this->get("connection", []);
        $this->seeStatusCode(200);
    }
}
