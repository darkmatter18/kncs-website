<?php


namespace App\Action;

use App\Domain\User\Service\UserCreator;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;


class UserCreateAction{

    private $userCreator;

    public function __construct(UserCreator $userCreator){
        $this->userCreator = $userCreator;
    }

    public function __invoke(ServerRequestInterface $request, ResponseInterface $response): ResponseInterface {
        // Collect input from the HTTP request
        $data = (array)$request->getParsedBody();

        // Invoke the Domain with inputs and retain the result
        $u = $this->userCreator->createUser($data);

        // $u [status, id, jwt]
        if($u['status']){
            // Transform the result into the JSON representation
            $result = [
                'status' => $u['status'],
                'user_id' => $u[0],
                'jwt' => $u[1]
            ];

            // Build the HTTP response
            $response->getBody()->write((string)json_encode($result));

            return $response
                ->withHeader('Content-Type', 'application/json')
                ->withStatus(201);
        }
        else {
            // Transform the result into the JSON representation
            $result = [
                'status' => $u['status']
            ];

            // Build the HTTP response
            $response->getBody()->write((string)json_encode($result));

            return $response
                ->withHeader('Content-Type', 'application/json')
                ->withStatus(401);
        }
    }

}