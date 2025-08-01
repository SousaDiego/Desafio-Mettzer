<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SavedArticle extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'url',
        'source',
        'description',
        'user_id' // se tiver FK para o usuário
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
