<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\NewsController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Api\LoginController;

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', fn (Request $request) => $request->user());

    Route::post('/articles/save', function (Request $request) {
        $data = $request->validate([
            'title' => 'required|string',
            'url' => 'required|url',
            'source' => 'nullable|string',
            'description' => 'nullable|string',
        ]);

        return $request->user()->savedArticles()->create($data);
    });

    Route::get('/articles/saved', function (Request $request) {
        return $request->user()->savedArticles;
    });

    Route::delete('/articles/{id}', function ($id, Request $request) {
        $article = $request->user()->savedArticles()->findOrFail($id);
        $article->delete();
        return response()->json(['message' => 'Artigo removido.']);
    });
});

Route::get('/noticias', [NewsController::class, 'buscarNoticias']);
Route::post('/register', [RegisteredUserController::class, 'store']);
Route::post('/login', [LoginController::class, 'login']);
Route::middleware('auth:sanctum')->post('/logout', [LoginController::class, 'logout']);

