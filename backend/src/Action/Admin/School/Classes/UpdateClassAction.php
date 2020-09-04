<?php


namespace App\Action\Admin\School\Classes;


use App\Domain\Admin\School\Service\ClassService;
use Exception;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use function DI\get;

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
            $this->classService->checkClassId((string)$args);

            $new_class_details = (array)$request->getParsedBody();

            //Update class
            $this->classService->updateClass($new_class_details, (string)$args);

            $result = [
                'status' => true
            ];

            $response->getBody()->write((string)json_encode($result));
            return $response
                ->withHeader('Content-Type', 'application/json');

        }catch (Exception $e){
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