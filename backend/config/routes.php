<?php

use App\Action\DummyAuth;
use App\Action\Home\HomeAction;
use App\Action\UserCreateAction;
use App\Middleware\JwtAuthMiddleware;
use Slim\App;
use Slim\Routing\RouteCollectorProxy;


return function (App $app) {

    /**
     * Dummy Routes
     */
    $app->get('/', HomeAction::class)->setName('home');
    $app->post('/users', UserCreateAction::class);
    $app->post('/token', DummyAuth::class);
    $app->post('/login', LoginAction::class);

    /**
     * Dummy API endpoints. This group is protected with JWT.
     * For Protected routes. To get the claims
     * $request->getAttribute('JwtClaims')
     */
    $app->group('/api', function (RouteCollectorProxy $group) {
        $group->post('/users', UserCreateAction::class);
    })->add(JwtAuthMiddleware::class);
};
