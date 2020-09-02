<?php


namespace App\Middleware;


use App\Auth\JwtAuth;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Server\MiddlewareInterface;
use Psr\Http\Server\RequestHandlerInterface;
use Slim\Psr7\Factory\ResponseFactory;

final class JwtAuthMiddleware implements MiddlewareInterface{
    /**
     * @var JwtAuth
     */
    private $jwtAuth;

    /**
     * The constructor.
     *
     * @param JwtAuth $jwtAuth
     */
    public function __construct(JwtAuth $jwtAuth) {
        $this->jwtAuth = $jwtAuth;
    }


    public function process(ServerRequestInterface $request, RequestHandlerInterface $handler): ResponseInterface{
        $token = explode(' ', (string)$request->getHeaderLine('Authorization'))[1] ?? '';

        if (!$token || !$this->jwtAuth->validateToken($token)) {
            $res = new ResponseFactory();
            return $res->createResponse()
                ->withHeader('Content-Type', 'application/json')
                ->withStatus(401, 'Unauthorized');
        }

        return $handler->handle($request);
    }
}