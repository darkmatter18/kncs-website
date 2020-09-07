<?php


namespace App\Action\Admission;

use App\Domain\Admission\Service\PreRegistrationLoginService;
use Exception;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

final class PreRegistrationLoginAction
{
    /**
     * @var PreRegistrationLoginService
     */
    private $preRegistrationLoginService;

    public function __construct(PreRegistrationLoginService $preRegistrationLoginService)
    {
        $this->preRegistrationLoginService = $preRegistrationLoginService;
    }

    public function __invoke(ServerRequestInterface $request, ResponseInterface $response)
    {
        try {
            //Get user inputs from HTTP requests
            $data = (array)$request->getParsedBody();

            //Check user inputs
            $this->preRegistrationLoginService->checkInput($data);

            $user_data = $this->preRegistrationLoginService->login($data);
            $return = [
                'auth' => [
                    'access_token' => $user_data['jwt'],
                    'token_type' => 'Bearer',
                    'expires_in' => $user_data['jwt_lifetime'],
                ],
                'user' => $user_data['user']
            ];

            $response->getBody()->write((string)json_encode($return));
            return $response
                ->withHeader('Content-Type', 'application/json');
        } catch (Exception $e) {
            return $response->withStatus($e->getCode(), $e->getMessage());
        }
    }
}