<?php


namespace App\Action\Admin\School\Subject;


use App\Domain\Admin\School\Subject\Service\SubjectService;
use Exception;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

final class DeleteSubjectAction
{
    /**
     * @var SubjectService
     */
    private $subjectService;

    public function __construct(SubjectService $subjectService){
        $this->subjectService->$subjectService;
    }

    public function __invoke(ServerRequestInterface $request, ResponseInterface $response, array $args){
        try {
            //Check the user role
            $this->subjectService->checkUser($request->getAttribute('JwtClaims')['user_role']);

            //Check if the subject id exists
            $this->subjectService->checkSubjectId($args['subject_id']);

            //Delete the subject
            $this->subjectService->deleteSubject($args['subject_id']);

            //Fetch all subjects
            $subjects = $this->subjectService->getSubjects();

            $result = [
                'data' => $subjects
            ];
            $response->getBody()->write((string)json_encode($result));

        }catch (Exception $e){
            return $response->withStatus($e->getCode(), $e->getMessage());
        }
    }
}