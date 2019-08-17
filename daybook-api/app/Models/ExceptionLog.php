<?php

namespace App\Models;

use App\Models\Concerns\Paginatable;
use Illuminate\Database\Eloquent\Model;

class ExceptionLog extends Model
{
    use Paginatable;

    protected $fillable = [];

    protected $hidden = [];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
