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
            $success_login_response = $this->login->login($data);

            $return = [
                'status' => true,
                'auth' => [
                    'access_token' => $success_login_response['jwt'],
                    'token_type' => 'Bearer',
                    'expires_in' => $success_login_response['jwt_lifetime'],
                ],
                'user' => $success_login_response['user']
            ];

            $response->getBody()->write((string)json_encode($return));
            return $response
                ->withHeader('Content-Type', 'application/json');

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