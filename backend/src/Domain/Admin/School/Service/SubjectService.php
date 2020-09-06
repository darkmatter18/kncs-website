<?php


namespace App\Domain\Admin\School\Service;


use App\Domain\Admin\School\Repository\SubjectRepository;
use App\Exception\AuthenticationException;
use App\Exception\NotFoundException;
use App\Exception\ValidationException;

final class SubjectService
{
    /**
     * @var SubjectRepository
     */
    private $subjectRepository;

    public function __construct(SubjectRepository $subjectRepository){
        $this->subjectRepository = $subjectRepository;
    }

    /**
     * Check user role
     * @param string $userRole
     */
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
        $subject = $this->subjectRepository->checkSubjectId($subject_id);
        if (!$subject){
            $errors['subject_id'] = "Subject doesn't exists";
        }
        if ($errors){
            throw new NotFoundException('Please enter a valid subject ID', $errors);
        }
    }

    public function getSubject(): array{
        return $this->subjectRepository->getSubject();
    }

    public function checkInput(array $subject_details): void{
        $errors = [];
        if (empty($subject_details['subject_name'])){
            $errors['subject_name'] = 'Please enter subject name';
        }

        if ($errors){
            throw new ValidationException('Please check your input', $errors);
        }
    }

    public function createSubject(array $subject_details){
        $this->subjectRepository->createSubject($subject_details);
    }

    public function updateSubject(array $new_subject_details, string $subject_id){
        $this->subjectRepository->updateSubject($new_subject_details, $subject_id);
    }

    public function deleteSubject(string $subject_id){
        $errors = [];
        if (empty($subject_id)){
            $errors = ['Subject ID is required to delete subject'];
        }
        if ($errors){
            throw new NotFoundException($errors[0], $errors);
        }
        $this->subjectRepository->deleteSubject($subject_id);
    }
}