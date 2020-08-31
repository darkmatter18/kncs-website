<?php

use App\Action\Home\HomeAction;
use App\Action\UserCreateAction;
use Slim\App;


return function (App $app) {
    $app->get('/', HomeAction::class)->setName('home');
    $app->post('/users', UserCreateAction::class);
};
