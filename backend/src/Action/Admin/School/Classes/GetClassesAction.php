<?php


namespace App\Action\Admin\School\Classes;


use App\Domain\Admin\School\Service\ClassService;
use Exception;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

final class GetClassesAction{

    private $classService;

    public function __construct(ClassService $classService){
        $this->classService = $classService;
    }

    public function __invoke(ServerRequestInterface $request, ResponseInterface $response, array $args){
        try {
            //Check user role
            $this->classService->checkUser($request->getAttribute('JwtClaims')['user_role']);

            //Get classes
            $this->classService->getClasses();

            $return = [
                'status' => true
            ];

            $response->getBody()->write((string)json_encode($return));
            return $response
                ->withHeader('Content-Type', 'application/json');

        }catch (Exception $e){
            return $response->withStatus($e->getCode(), $e->getMessage());
        }
    }
}