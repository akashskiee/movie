<?php

namespace Common\Settings\Mail;

use Common\Auth\Oauth;
use File;
use Socialite;

class HandleConnectGmailOauthCallback
{
    public function execute(string $provider)
    {
        $profile = Socialite::with('google')->user();

        File::ensureDirectoryExists(basename(GmailClient::tokenPath()));
        File::put(
            GmailClient::tokenPath(),
            json_encode([
                'access_token' => $profile->token,
                'refresh_token' => $profile->refreshToken,
                'created' => now()->timestamp,
                'expires_in' => $profile->expiresIn,
                'email' => $profile->email,
            ]),
        );

        return app(Oauth::class)->getPopupResponse(self::class, [
            'profile' => $profile,
        ]);
    }

    public function test()
    {
        //$results = $service->users_history->listUsersHistory('me', ['startHistoryId' => 1143288]);

        $results = $service->users_messages->get('me', '17bb70fdbfe9917b', [
            'format' => 'full',
        ]);

        // TODO: to make google return refresh token
        //https://stackoverflow.com/questions/33988064/how-can-i-manage-oauth-refresh-tokens-with-laravel
        // offline and select_account consent params are set in gmail api quickstart guide in google docs as well

        dd($results);

        dd($externalProfile);
    }
}
