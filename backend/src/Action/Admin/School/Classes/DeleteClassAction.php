<?php


namespace App\Action\Admin\School\Classes;


use App\Domain\Admin\School\Service\ClassService;
use Exception;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

final class DeleteClassAction{

    private $classService;

    public function __construct(ClassService $classService){
        $this->classService = $classService;
    }

    public function __invoke(ServerRequestInterface $request, ResponseInterface $response, array $args){
        try {
            //Check user role
            $this->classService->checkUser($request->getAttribute('JwtClaims')['user_role']);

            //Check if class ID exists or not
            $this->classService->checkClassId($args['class_id']);

            //Delete class
            $this->classService->deleteClass($args['class_id']);

            //Get all classes
            $classes = $this->classService->getClasses();

            //Return response
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