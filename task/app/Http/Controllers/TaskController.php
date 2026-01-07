<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Task;
use App\Http\Requests\StoreTaskRequest;
use App\Http\Resources\TaskResource;

class TaskController extends Controller
{
    public function index(Request $request)
    {
        return $request->user()->tasks;
        // return TaskResource::collection(
        //     $request->user()->tasks()->latest()->get()
        // );
    }

    public function store(StoreTaskRequest $request)
    {
        $data = $request->validated();
        $task =  $request->user()->tasks()->create([
            'title' => $request->title,
            'description' => $request->desc,
        ]);
        return new TaskResource($task);
    }

    public function update(Request $request,Task $task)
    {
        $task->update([
            'title' => $request->title,
            'description' => $request->desc,
            'status'=>!$task->status
        ]);
        return $task;
    }

    public function destroy(Task $task)
    {
        $task->delete();
        return response()->json(['message'=>'Deleted']);

    }
}
