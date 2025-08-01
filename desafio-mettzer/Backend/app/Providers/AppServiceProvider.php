<?php

namespace App\Providers;
use Illuminate\Support\Facades\Schema;
use Illuminate\Auth\Notifications\ResetPassword;
use Illuminate\Support\ServiceProvider;


class AppServiceProvider extends ServiceProvider
{
    
    public function register(): void
    {
       
    }

    public function boot(): void
    {
        Schema::defaultStringLength(191);
        ResetPassword::createUrlUsing(function (object $notifiable, string $token) {
            return config('app.frontend_url')."/password-reset/$token?email={$notifiable->getEmailForPasswordReset()}";
        });
    }
}
