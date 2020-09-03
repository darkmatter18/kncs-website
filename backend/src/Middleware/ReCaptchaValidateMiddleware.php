<?php


namespace App\Middleware;


use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Server\MiddlewareInterface;
use Psr\Http\Server\RequestHandlerInterface;
use Slim\Psr7\Factory\ResponseFactory;

class ReCaptchaValidateMiddleware implements MiddlewareInterface
{

    public function process(ServerRequestInterface $request, RequestHandlerInterface $handler): ResponseInterface{
        $recaptcha_client_response = $request->getParsedBody()['recaptcha_token'];
        $verified = false;
        if(isset($recaptcha_client_response)){
            $verifyResponse= file_get_contents('https://www.google.com/recaptcha/api/siteverify?secret='.
                $_SERVER['HTTP_RECAPTA_SERECT'].'&response='.$recaptcha_client_response.'&remoteip');
            $response =  json_decode($verifyResponse);
            if($response->success){
                $verified=true;
            }
        }
        if(!$verified){
            $res = new ResponseFactory();
            return $res->createResponse()
                ->withHeader('Content-Type', 'application/json')
                ->withStatus(401, 'ReCaptcha Verification failed');
        }

        return $handler->handle($request);
    }
}