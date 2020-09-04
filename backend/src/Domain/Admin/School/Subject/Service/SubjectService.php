<?php


namespace App\Domain\Admin\School\Subject\Service;


use App\Exception\AuthenticationException;
use App\Exception\NotFoundException;

final class SubjectService
{
    /**
     * @var SubjectService
     */
    private $subjectService;

    public function __construct(SubjectService $subjectService){
        $this->subjectService = $subjectService;
    }

    public function checkUser(string $userRole): void{
        $errors = [];
        if ($userRole != 'admin'){
            $errors = ['Unauthorized operation'];
        }

        if ($errors){
            throw new AuthenticationException($errors[0], $errors);
        }
    }

    public function checkSubjectId(string $subject_id): void{
        $errors = [];
        $subject = $this->subjectService->checkSubjectId($subject_id);
        if (!$subject){
            $errors = ["Subject doesn't exists"];
        }
        if ($errors){
            throw new NotFoundException($errors[0], $errors);
        }
    }

    public function getSubjects(): array{
        $errors = [];
        $subjects = $this->subjectService->getSubjects();
        if (empty($subjects)){
            $errors = ['No subjects found'];
        }

        if ($errors){
            throw new NotFoundException($errors[0], $errors);
        }else{
            return $subjects;
        }
    }

    public function createSubject(array $subject_details){
        $this->subjectService->createSubject($subject_details);
    }

    public function updateSubject(array $new_subject_details, string $subject_id){
        $this->subjectService->updateSubject($new_subject_details, $subject_id);
    }

    public function deleteSubject(string $subject_id){
        $this->subjectService->deleteSubject($subject_id);
    }
}