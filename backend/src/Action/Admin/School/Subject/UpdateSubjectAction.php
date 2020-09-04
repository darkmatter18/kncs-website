<?php


namespace App\Action\Admin\School\Subject;


use App\Domain\Admin\School\Subject\Service\SubjectService;
use Exception;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

final class UpdateSubjectAction{
    /**
     * @var SubjectService
     */
    private $subjectService;

    public function __construct(SubjectService $subjectService){
        $this->subjectService = $subjectService;
    }

    public function __invoke(ServerRequestInterface $request, ResponseInterface $response, array $args){
        try {
            //Check the user role
            $this->subjectService->checkUser($request->getAttribute('JwtClaims')['user_role']);

            //Check if subject id exists
            $this->subjectService->checkSubjectId($args['subject_id']);

            //Get subject details from user
            $new_subject_details = (array)$request->getParsedBody();

            //Update subject
            $this->subjectService->updateSubject($new_subject_details, $args['subject_id']);

            //Fetch all subjects
            $subjects = $this->subjectService->getSubjects();

            $result = [
                'data' => $subjects
            ];

            $response->getBody()->write((string)json_encode($result));
            return $response
                    ->withHeader('Content-type', 'application/json');

        }catch (Exception $e){
            return $response->withStatus($e->getCode(), $e->getMessage());
        }
    }
}