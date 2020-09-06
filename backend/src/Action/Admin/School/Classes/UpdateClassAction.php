<?php


namespace App\Action\Admin\School\Classes;


use App\Domain\Admin\School\Service\ClassService;
use Exception;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

final class UpdateClassAction
{
    /**
     * @var ClassService
     */
    private $classService;

    public function __construct(ClassService $classService)
    {
        $this->classService = $classService;
    }

    public function __invoke(ServerRequestInterface $request, ResponseInterface $response, array $args):ResponseInterface{
        try{
            //Check user role
            $this->classService->checkUser($request->getAttribute('JwtClaims')['user_role']);

            //Check if input class id exists
            $this->classService->checkClassId($args['class_id']);

            //Get input by HTTP request
            $new_class_details = (array)$request->getParsedBody();

            //Update class
            $this->classService->updateClass($new_class_details, $args['class_id']);

            //Fetch all classes
            $classes = $this->classService->getClasses();

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