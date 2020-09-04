<?php


namespace App\Action\Admin\School\Subject;


use App\Domain\Admin\School\Subject\Service\SubjectService;
use Exception;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

final class GetSubjectAction
{
    /**
     * @var SubjectService
     */
    private $subjectService;

    public function __construct(SubjectService $subjectService){
        $this->subjectService = $subjectService;
    }

    public function __invoke(ServerRequestInterface $request, ResponseInterface $response){
        try {
            //Check the user role
            $this->subjectService->checkUser($request->getAttribute('JwtClaims')['user_role']);

            //Fetch all classes
            $classes = $this->subjectService->getSubjects();

            $result = [
                'data' => $classes
            ];
            $response->getBody()->write((string)json_encode($result));
            return $response
                    ->withHeader('Content-type', 'application/json');

        }catch (Exception $e){
            return $response->withStatus($e->getCode(), $e->getMessage());
        }
    }
}