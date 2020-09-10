<?php

use App\Middleware\CrosMiddleware;
use App\Middleware\JwtClaimMiddleware;
use Slim\App;
use Slim\Middleware\ErrorMiddleware;
use Selective\BasePath\BasePathMiddleware;

return function (App $app) {
    // Parse json, form data and xml
    $app->addBodyParsingMiddleware();

    // Add CROS middleware
    $app->add(CrosMiddleware::class);

    // Add the Slim built-in routing middleware
    $app->addRoutingMiddleware();

    // Base path middleware
    $app->add(BasePathMiddleware::class);

    // Claims JWT data
    $app->add(JwtClaimMiddleware::class);

    // Catch exceptions and errors
    $app->add(ErrorMiddleware::class);
};