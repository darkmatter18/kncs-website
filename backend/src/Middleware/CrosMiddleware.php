<?php


namespace App\Middleware;


use Psr\Container\ContainerInterface;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Server\MiddlewareInterface;
use Psr\Http\Server\RequestHandlerInterface;
use Slim\Routing\RouteContext;

class CrosMiddleware implements MiddlewareInterface
{

    /**
     * @var ContainerInterface
     */
    private $container;

    public function __construct(ContainerInterface $container){
        $this->container = $container;
    }

    /**
     * @inheritDoc
     */
    public function process(ServerRequestInterface $request, RequestHandlerInterface $handler): ResponseInterface{
        $routeContext = RouteContext::fromRequest($request);
        $routingResults = $routeContext->getRoutingResults();
        $methods = $routingResults->getAllowedMethods();
        $requestHeaders = $request->getHeaderLine('Access-Control-Request-Headers');

        $response = $handler->handle($request);

        $cros_urls = $this->container->get('settings')['cros_urls'];

        if (in_array($_SERVER['HTTP_ORIGIN'], $cros_urls)) {
            $response = $response->withHeader('Access-Control-Allow-Origin', $_SERVER['HTTP_ORIGIN']);
            $response = $response->withHeader('Access-Control-Allow-Methods', implode(',', $methods));
            $response = $response->withHeader('Access-Control-Allow-Headers', $requestHeaders);
            $response = $response->withHeader('Access-Control-Allow-Credentials', 'true');
        }

        return $response;
    }
}