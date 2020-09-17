<?php


namespace App\Action;


use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

class FileRetriveAction
{
    public function __construct()
    {
    }

    public function __invoke(ServerRequestInterface $request, ResponseInterface $response, array $args)
    {
        print_r($args['file_name']);
    }
}