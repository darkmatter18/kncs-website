<?php


namespace App\Action;

use Exception;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use App\Domain\Login\Service\LoginService;
class LoginAction{
    private $login;

    public function __construct(LoginService $login){
        $this->login = $login;
    }

    public function __invoke(ServerRequestInterface $request, ResponseInterface $response){

        // Collect input from the HTTP request
        $data = (array)$request->getParsedBody();

        try {
            // Checking the input
            $this->login->checkInput($data);

            // Check ReCaptcha

            // Check if the User exist
            return $this->login->login($data);
        }
        catch (Exception $e){
            $result = [
                "status" => false,
                "error_no" => $e->getCode(),
                "error" => $e->getMessage()
            ];
            $response->getBody()->write((string)json_encode($result));
            return $response
                ->withHeader('Content-Type', 'application/json');
        }

    }
}