<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class NewsController extends Controller
{
   public function buscarNoticias(Request $request)
{
    $termo = $request->query('q', 'technology'); // Pega ?q=

    $resposta = Http::get('https://newsapi.org/v2/everything', [
        'q' => $termo,
        'apiKey' => config('services.newsapi.key'),
    ]);

    if ($resposta->successful()) {
        return response()->json($resposta->json()['articles'] ?? []);
    }

    return response()->json(['error' => 'Erro ao buscar notícias'], $resposta->status());
}
}
