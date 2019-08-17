<?php

namespace App\Http\Controllers;

use App\Helper\ErrorResult;
use App\Helper\Feeling;
use App\Http\Controllers\Base\Controller;
use App\Http\Resources\MemoryCollectionResource;
use App\Http\Resources\MemoryResource;
use App\Models\Memory;
use App\Models\MemoryLog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Date;

class MemoryController extends Controller
{
    public function getAll(Request $request)
    {
        $user = \Auth::user();

        $q = Memory::query();
        $q->where('user_id', $user->id);
        $q->orderBy('memory_date_time', 'DESC');
        return MemoryCollectionResource::collection($q->get());
    }

    public function read(Request $request, $id)
    {
        $user = \Auth::user();

        $q = Memory::query();
        $q->where('user_id', $user->id);
        $q->where('id', $id);
        $obj = $q->first();
        if ($obj) {
            return new MemoryResource($obj);
        } else {
            return ErrorResult::NotFound();
        }
    }

    public function create(Request $request)
    {
        $this->validate($request, [
            'feeling' => 'required|numeric|between:' . Feeling::MIN . ',' . Feeling::MAX,
            'title' => 'required',
        ]);

        $user = \Auth::user();

        $obj = new Memory();
        $obj->user_id = $user->id;
        $obj->feeling = $request->input('feeling');
        $obj->memory_date_time = Date::now();
        $obj->title = $request->input('title');
        $obj->context = '';
        $obj->save();

        return ['id' => $obj->id];
    }

    public function update(Request $request, $id)
    {
        $user = \Auth::user();

        $q = Memory::query();
        $q->where('user_id', $user->id);
        $q->where('id', $id);
        $obj = $q->first();
        if ($obj) {
            $this->validate($request, [
                'feeling' => 'required|numeric|between:' . Feeling::MIN . ',' . Feeling::MAX,
                'title' => 'required',
                'memory_date_time' => 'required',
                'context' => 'required',
            ]);

            $log = new MemoryLog();
            $log->memory_id = $obj->id;
            $log->feeling = $obj->feeling;
            $log->memory_date_time = $obj->memory_date_time;
            $log->title = $obj->title;
            $log->context = $obj->context;
            $log->save();

            $obj->feeling = $request->input('feeling');
            $obj->memory_date_time = $request->input('memory_date_time');
            $obj->title = $request->input('title');
            $obj->context = $request->input('context');
            $obj->save();

            return $this->ok();
        } else {
            return ErrorResult::NotFound();
        }

    }

    public function delete(Request $request, $id)
    {
        $user = \Auth::user();

        $q = Memory::query();
        $q->where('user_id', $user->id);
        $q->where('id', $id);
        $obj = $q->first();
        if ($obj) {
            $obj->forceDelete();
            return $this->ok();
        } else {
            return ErrorResult::NotFound();
        }
    }
}
