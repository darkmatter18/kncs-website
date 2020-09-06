<?php


namespace App\Action\Admin\School\Subject;


use App\Domain\Admin\School\Service\SubjectService;
use Exception;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use function DI\string;

final class CreateSubjectAction
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
            //Check user role
            $this->subjectService->checkUser($request->getAttribute('JwtClaims')['user_role']);

            //Request and get data from HTTP method
            $subject_details = (array)$request->getParsedBody();

            //Check user data
            $this->subjectService->checkInput($subject_details);

            //Creation of new subject
            $this->subjectService->createSubject($subject_details);

            //Get all subjects
            $subjects = $this->subjectService->getSubject();

            if (sizeof($subjects) === 0){
                return $response->withStatus(204, 'No subject found');
            }
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