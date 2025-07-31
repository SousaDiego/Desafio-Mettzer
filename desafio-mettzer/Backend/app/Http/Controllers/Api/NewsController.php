<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class NewsController extends Controller
{
    public function buscarNoticias()
    {
        $resposta = Http::get('https://newsapi.org/v2/everything', [
            'q' => 'technology',
            'apiKey' => config('services.newsapi.key'),
        ]);

        if ($resposta->successful()) {
            $dados = $resposta->json();
            $artigos = $dados['articles'] ?? [];

            return response()->json($artigos);
        }

        return response()->json([
            'error' => 'Não foi possível obter as notícias.'
        ], $resposta->status());
    }
}
