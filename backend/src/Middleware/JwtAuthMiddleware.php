<?php


namespace App\Middleware;


use App\Auth\JwtAuth;
use Psr\Http\Message\ResponseFactoryInterface;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Server\MiddlewareInterface;
use Psr\Http\Server\RequestHandlerInterface;

final class JwtAuthMiddleware implements MiddlewareInterface{
    /**
     * @var JwtAuth
     */
    private $jwtAuth;

    /**
     * @var ResponseFactoryInterface
     */
    private $responseFactory;

    /**
     * The constructor.
     *
     * @param JwtAuth $jwtAuth The JWT auth
     * @param ResponseFactoryInterface $responseFactory The response factory
     */
    public function __construct(
        JwtAuth $jwtAuth,
        ResponseFactoryInterface $responseFactory
    ) {
        $this->jwtAuth = $jwtAuth;
        $this->responseFactory = $responseFactory;
    }

    public function process(ServerRequestInterface $request, RequestHandlerInterface $handler): ResponseInterface{
        $token = explode(' ', (string)$request->getHeaderLine('Authorization'))[1] ?? '';

        if (!$token || !$this->jwtAuth->validateToken($token)) {
            return $this->responseFactory->createResponse()
                ->withHeader('Content-Type', 'application/json')
                ->withStatus(401, 'Unauthorized');
        }

        return $handler->handle($request);
    }
}