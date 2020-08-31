<?php


namespace App\Action\Home;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;


final class HomeAction{

    public function __invoke(ServerRequestInterface $request, ResponseInterface $response):ResponseInterface{

        $return = ['success' => true];
        $response->getBody()->write(json_encode($return));
        return $response->withHeader('Content-Type', 'application/json')            ;

    }

}