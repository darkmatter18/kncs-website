<?php


namespace App\Action;

use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use App\Domain\User\Service\LoginService;
class LoginAction{
    private $login;

    public function __construct(LoginService $login){
        $this->login = $login;
    }

    public function __invoke(ServerRequestInterface $request, ResponseInterface $response){
        // Collect input from the HTTP request
        $data = (array)$request->getParseBody();

        // Invoke the Domain with inputs and retain the result
        $u = $this->login->loginData($data);
    }
}