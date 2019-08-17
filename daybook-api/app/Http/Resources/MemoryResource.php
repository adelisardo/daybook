<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class MemoryResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'feeling' => $this->feeling,
            'memory_date_time' => $this->memory_date_time,
            'title' => $this->title,
            'context' => $this->context,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
