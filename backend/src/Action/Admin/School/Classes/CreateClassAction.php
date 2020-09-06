<?php


namespace App\Action\Admin\School\Classes;


use App\Domain\Admin\School\Service\ClassService;
use Exception;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

final class CreateClassAction{

    private $classService;

    public function __construct(ClassService $classService){
        $this->classService = $classService;
    }
    public function __invoke(ServerRequestInterface $request, ResponseInterface $response){
        try{
            //Check user role
            $this->classService->checkUser($request->getAttribute('JwtClaims')['user_role']);

            //Request data from HTTP request
            $class_details = (array)$request->getParsedBody();

            //Check user input
            $this->classService->checkInput($class_details);

            //Creation of a new class
            $this->classService->createClass($class_details);

            //Get all classes
            $classes = $this->classService->getClasses();

            if (sizeof($classes) === 0){
                return $response->withStatus(204, 'No class found');
            }
            $result = [
                'data' => $classes
            ];

            $response->getBody()->write((string)json_encode($result));
            return $response
                ->withHeader('Content-Type', 'application/json');
        }catch (Exception $e){
            return $response->withStatus($e->getCode(), $e->getMessage());
        }
    }
}