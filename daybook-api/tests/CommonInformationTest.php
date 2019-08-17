<?php

class CommonInformationTest extends TestCase
{
    public function testRead()
    {
        $this->get("commonInformation");
        $this->seeStatusCode(200);
    }
}
