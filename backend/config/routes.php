<?php

use App\Action\Admin\School\Classes\CreateClassAction;
use App\Action\Admin\School\Classes\DeleteClassAction;
use App\Action\Admin\School\Classes\GetClassesAction;
use App\Action\Admin\School\Classes\UpdateClassAction;
use App\Action\DummyAuth;
use App\Action\Home\HomeAction;
use App\Action\LoginAction;
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

    /**
     * Dummy API endpoints. This group is protected with JWT.
     * For Protected routes. To get the claims
     * $request->getAttribute('JwtClaims')
     */
    $app->group('/api', function (RouteCollectorProxy $group) {
        $group->post('/users', UserCreateAction::class);
    })->add(JwtAuthMiddleware::class);


    //Login Route
    $app->post('/login', LoginAction::class);

    //Admin route
    $app->group('/admin', function (RouteCollectorProxy $group){
        $group->group('/school/class', function (RouteCollectorProxy $classGroup){
            $classGroup->get('', GetClassesAction::class );
            $classGroup->post('', CreateClassAction::class);
            $classGroup->put('{class_id}', UpdateClassAction::class);
            $classGroup->delete('{class_id}', DeleteClassAction::class);
        });
    })->add(JwtAuthMiddleware::class);


};
