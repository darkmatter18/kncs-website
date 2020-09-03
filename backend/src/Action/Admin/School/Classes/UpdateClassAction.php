<?php


namespace App\Action\Admin\School\Classes;


use App\Domain\Admin\School\Service\ClassService;
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
        $data = $request->getParsedBody();
        //print_r($args['class_id']);
        //print_r($request->getAttribute('JwtClaims')->user_role);
        //Check user role
        $this->classService->checkRole($request->getAttribute('JwtClaims'));
        //Check if input class id exists
        //$this->classes->checkClass($data);

    }
}