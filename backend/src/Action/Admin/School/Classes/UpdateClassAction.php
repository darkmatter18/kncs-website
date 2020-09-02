<?php


namespace App\Action\Admin\School\Classes;


use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use function DI\get;

final class UpdateClassAction
{
    public function __invoke(ServerRequestInterface $request, ResponseInterface $response):ResponseInterface{
        $data = $request->getParsedBody();

        //Check if input class id exists
        //$this->classes->checkClass($data);
    }
}